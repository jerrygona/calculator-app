import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Row, Col, Tag, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { api, ImageData } from '../services/api';

const { Search } = Input;

// 更多的示例数据
const dummyImages: ImageData[] = [
  {
    id: 1,
    title: '现代办公大楼',
    url: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a',
    tags: ['现代', '办公楼', '玻璃幕墙'],
    description: '位于市中心的现代化办公大楼，采用玻璃幕墙设计'
  },
  {
    id: 2,
    title: '古典建筑',
    url: 'https://images.unsplash.com/photo-1495714096525-285e85481090',
    tags: ['古典', '欧式', '石材'],
    description: '融合古典元素的欧式建筑，展现永恒魅力'
  },
  {
    id: 3,
    title: '现代博物馆',
    url: 'https://images.unsplash.com/photo-1529154166925-574a0236a4f4',
    tags: ['现代', '博物馆', '文化'],
    description: '独特的几何造型设计，展现现代建筑美学'
  },
  {
    id: 4,
    title: '传统中式建筑',
    url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
    tags: ['中式', '传统', '古建筑'],
    description: '典型的中国传统建筑风格，体现东方美学'
  },
  {
    id: 5,
    title: '现代住宅',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    tags: ['住宅', '现代', '简约'],
    description: '简约现代的住宅设计，注重功能性和美观性的平衡'
  },
  {
    id: 6,
    title: '工业风办公空间',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    tags: ['工业风', '办公', '室内'],
    description: '将工业元素融入办公空间，创造独特的工作环境'
  }
];

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(dummyImages);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 获取所有可用的标签
  const allTags = Array.from(new Set(images.flatMap(img => img.tags)));

  useEffect(() => {
    // 初始加载时获取所有图片
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await api.getImages();
      setImages(data.length > 0 ? data : dummyImages); // 如果API返回空，使用示例数据
    } catch (error) {
      console.error('Failed to load images:', error);
      message.error('加载图片失败，显示示例数据');
      setImages(dummyImages);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    if (!value) {
      await loadImages();
      return;
    }

    try {
      setLoading(true);
      const data = await api.searchImages(value);
      setImages(data);
    } catch (error) {
      console.error('Search failed:', error);
      message.error('搜索失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = async (value: string[]) => {
    setSelectedTags(value);
    if (value.length === 0) {
      await loadImages();
      return;
    }

    try {
      setLoading(true);
      const data = await api.getImagesByTags(value);
      setImages(data);
    } catch (error) {
      console.error('Tag filter failed:', error);
      message.error('标签筛选失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={16}>
          <Search
            placeholder="搜索建筑图片..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择标签筛选"
            onChange={handleTagChange}
            options={allTags.map(tag => ({ label: tag, value: tag }))}
            size="large"
            disabled={loading}
          />
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map(image => (
            <Card
              key={image.id}
              hoverable
              style={{ marginBottom: 16 }}
              cover={
                <LazyLoadImage
                  alt={image.title}
                  src={image.url}
                  effect="blur"
                  style={{ width: '100%', height: 'auto' }}
                />
              }
            >
              <Card.Meta
                title={image.title}
                description={
                  <>
                    <p>{image.description}</p>
                    <div>
                      {image.tags.map(tag => (
                        <Tag
                          key={tag}
                          color="blue"
                          style={{ margin: '4px' }}
                          onClick={() => handleTagChange([tag])}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </>
                }
              />
            </Card>
          ))}
        </Masonry>
      )}

      <style>{`
        .masonry-grid {
          display: flex;
          width: 100%;
          margin-left: -16px;
        }
        .masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export default Gallery; 