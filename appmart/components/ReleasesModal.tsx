import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { GitHubRelease, ReleaseAsset } from '@/services/github';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ReleasesModalProps {
  releases: GitHubRelease[];
  visible: boolean;
  onClose: () => void;
  repoName: string;
}

export default function ReleasesModal({ releases, visible, onClose, repoName }: ReleasesModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [downloading, setDownloading] = useState<number | null>(null);

  const themeColors = {
    background: isDark ? '#0F172A' : '#fff',
    card: isDark ? '#1E293B' : '#F9FAFB',
    text: isDark ? '#F1F5F9' : '#111827',
    subtext: isDark ? '#94A3B8' : '#6B7280',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    buttonBg: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(14, 165, 233, 0.1)',
    buttonText: isDark ? '#38BDF8' : '#0EA5E9',
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileIcon = (fileName: string): string => {
    const ext = fileName.toLowerCase().split('.').pop();
    switch (ext) {
      case 'apk':
        return 'logo-android';
      case 'ipa':
        return 'logo-apple';
      case 'zip':
      case 'tar':
      case 'gz':
        return 'archive-outline';
      case 'exe':
        return 'logo-windows';
      default:
        return 'document-outline';
    }
  };

  const isDownloadable = (fileName: string): boolean => {
    const downloadableExts = ['apk', 'ipa', 'zip', 'tar', 'gz', 'exe', 'dmg', 'deb', 'rpm'];
    const ext = fileName.toLowerCase().split('.').pop();
    return downloadableExts.includes(ext || '');
  };

  const handleDownload = async (asset: ReleaseAsset) => {
    try {
      setDownloading(asset.id);

      // For APK and other files, open in browser
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const supported = await Linking.canOpenURL(asset.browser_download_url);
        if (supported) {
          await Linking.openURL(asset.browser_download_url);
          Alert.alert(
            'Download Started',
            `${asset.name} download has started in your browser. Check your downloads folder.`,
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      Alert.alert('Download Error', 'Failed to start download. Please try again.');
      console.error('Download error:', error);
    } finally {
      setDownloading(null);
    }
  };

  const renderAsset = (asset: ReleaseAsset, releaseTag: string) => {
    if (!isDownloadable(asset.name)) return null;

    return (
      <TouchableOpacity
        key={asset.id}
        style={[styles.assetItem, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
        onPress={() => handleDownload(asset)}
        disabled={downloading === asset.id}
      >
        <View style={styles.assetInfo}>
          <Ionicons name={getFileIcon(asset.name)} size={24} color={themeColors.buttonText} />
          <View style={styles.assetDetails}>
            <Text style={[styles.assetName, { color: themeColors.text }]} numberOfLines={1}>
              {asset.name}
            </Text>
            <View style={styles.assetMeta}>
              <Text style={[styles.assetSize, { color: themeColors.subtext }]}>
                {formatFileSize(asset.size)}
              </Text>
              <Text style={[styles.assetDivider, { color: themeColors.subtext }]}> • </Text>
              <Text style={[styles.assetDownloads, { color: themeColors.subtext }]}>
                {asset.download_count} downloads
              </Text>
            </View>
          </View>
        </View>
        {downloading === asset.id ? (
          <View style={[styles.downloadButton, { backgroundColor: themeColors.buttonBg }]}>
            <Ionicons name="hourglass-outline" size={18} color={themeColors.buttonText} />
          </View>
        ) : (
          <View style={[styles.downloadButton, { backgroundColor: themeColors.buttonBg }]}>
            <Ionicons name="download-outline" size={18} color={themeColors.buttonText} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderRelease = ({ item }: { item: GitHubRelease }) => {
    const downloadableAssets = item.assets.filter((asset) => isDownloadable(asset.name));

    if (downloadableAssets.length === 0) return null;

    return (
      <View style={styles.releaseItem}>
        <View style={styles.releaseHeader}>
          <View style={styles.releaseTitleRow}>
            <Ionicons 
              name={item.prerelease ? 'flask-outline' : 'pricetag-outline'} 
              size={20} 
              color={item.prerelease ? '#F59E0B' : themeColors.buttonText} 
            />
            <Text style={[styles.releaseTag, { color: themeColors.text }]}>
              {item.tag_name}
            </Text>
            {item.prerelease && (
              <View style={styles.prereleaseTag}>
                <Text style={styles.prereleaseText}>Pre-release</Text>
              </View>
            )}
          </View>
          {item.name && item.name !== item.tag_name && (
            <Text style={[styles.releaseName, { color: themeColors.text }]} numberOfLines={1}>
              {item.name}
            </Text>
          )}
          <Text style={[styles.releaseDate, { color: themeColors.subtext }]}>
            Released on {formatDate(item.published_at)}
          </Text>
        </View>

        <View style={styles.assetsContainer}>
          {downloadableAssets.map((asset) => renderAsset(asset, item.tag_name))}
        </View>

        {item.body && (
          <Text style={[styles.releaseNotes, { color: themeColors.subtext }]} numberOfLines={3}>
            {item.body.replace(/[#*`]/g, '').trim()}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
          <View>
            <Text style={[styles.title, { color: themeColors.text }]}>Releases</Text>
            <Text style={[styles.subtitle, { color: themeColors.subtext }]}>
              {repoName} • {releases.length} versions
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        {releases.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color={themeColors.subtext} />
            <Text style={[styles.emptyText, { color: themeColors.text }]}>
              No releases available
            </Text>
            <Text style={[styles.emptySubtext, { color: themeColors.subtext }]}>
              This repository doesn't have any releases yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={releases}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderRelease}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  releaseItem: {
    marginBottom: 24,
  },
  releaseHeader: {
    marginBottom: 12,
  },
  releaseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  releaseTag: {
    fontSize: 20,
    fontWeight: '700',
  },
  prereleaseTag: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  prereleaseText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '600',
  },
  releaseName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  releaseDate: {
    fontSize: 13,
    marginTop: 4,
  },
  assetsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  assetDetails: {
    flex: 1,
  },
  assetName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetSize: {
    fontSize: 13,
  },
  assetDivider: {
    fontSize: 13,
  },
  assetDownloads: {
    fontSize: 13,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  releaseNotes: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    textAlign: 'center',
  },
});
