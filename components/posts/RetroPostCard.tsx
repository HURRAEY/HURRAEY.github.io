/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Clock, User, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { Post } from "../../lib/types";

interface PostCardProps {
  post: Post;
  delay?: number;
  onClick?: () => void;
}

// 한글 포함 여부 체크
function hasKorean(text: string): boolean {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
}

// 태그 문자열을 배열로 변환
function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString.split(",").map((tag) => tag.trim()).filter(Boolean);
}

// 색상 그라데이션 선택 함수
function getColorGradient(index: number): { from: string; to: string } {
  const colors = [
    { from: "#e91e63", to: "#f06292" },
    { from: "#9c27b0", to: "#ba68c8" },
    { from: "#00bcd4", to: "#4dd0e1" },
    { from: "#4caf50", to: "#81c784" },
    { from: "#ff9800", to: "#ffb74d" },
    { from: "#f44336", to: "#e57373" },
  ];
  return colors[index % colors.length];
}

// 결정론적인 해시 함수 (서버와 클라이언트에서 동일한 값 생성)
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// 포스트 기반으로 결정론적인 좋아요 수 생성
function getInitialLikes(post: Post): number {
  const hash = simpleHash(post.route + post.title);
  return 50 + (hash % 200);
}

// 포스트 기반으로 결정론적인 댓글 수 생성
function getInitialComments(post: Post): number {
  const hash = simpleHash(post.route + post.date);
  return 10 + (hash % 50);
}

export function RetroPostCard({ post, delay = 0, onClick }: PostCardProps) {
  const [likes, setLikes] = useState(getInitialLikes(post));
  const [isLiked, setIsLiked] = useState(false);
  const tags = parseTags(post.tag);
  const colorGradient = getColorGradient(post.title.charCodeAt(0) % 6);
  const comments = getInitialComments(post);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const CardContent = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      css={css`
        background: white;
        border: 4px solid black;
        box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        margin-bottom: 1rem;
        cursor: pointer;
        @media (min-width: 768px) {
          margin-bottom: 1.5rem;
        }
      `}
    >
      {/* Header Bar */}
      <div
        css={css`
          background: linear-gradient(to right, ${colorGradient.from}, ${colorGradient.to});
          padding: 0.75rem;
          border-bottom: 4px solid black;
          @media (min-width: 768px) {
            padding: 1rem;
          }
        `}
        onClick={handleCardClick}
      >
        <h2
          css={css`
            color: white;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
            font-family: ${hasKorean(post.title)
              ? `"DungGeunMo", monospace`
              : `"Press Start 2P", monospace`};
            @media (min-width: 768px) {
              font-size: 1rem;
            }
          `}
        >
          {post.title.toUpperCase()}
        </h2>
      </div>

      {/* Meta Info */}
      <div
        css={css`
          background: #fce4ec;
          padding: 0.5rem;
          border-bottom: 2px solid #ec407a;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 0.75rem;
          @media (min-width: 768px) {
            padding: 0.75rem;
            gap: 1rem;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.25rem;
          `}
        >
          <User
            css={css`
              width: 0.75rem;
              height: 0.75rem;
              color: #e91e63;
              @media (min-width: 768px) {
                width: 1rem;
                height: 1rem;
              }
            `}
          />
          <span css={css`font-family: "DungGeunMo", monospace;`}>
            HURRAEY
          </span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.25rem;
          `}
        >
          <Clock
            css={css`
              width: 0.75rem;
              height: 0.75rem;
              color: #9c27b0;
              @media (min-width: 768px) {
                width: 1rem;
                height: 1rem;
              }
            `}
          />
          <span css={css`font-family: "VT323", monospace;`}>{post.date}</span>
        </div>
      </div>

      {/* Content */}
      <div
        css={css`
          padding: 1rem;
          @media (min-width: 768px) {
            padding: 1.5rem;
          }
        `}
      >
        <p
          css={css`
            color: #1a0033;
            font-size: 0.75rem;
            line-height: 1.5;
            margin-bottom: 1rem;
            font-family: "DungGeunMo", monospace;
            @media (min-width: 768px) {
              font-size: 0.875rem;
            }
          `}
        >
          {post.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              margin-bottom: 1rem;
            `}
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                css={css`
                  display: inline-flex;
                  align-items: center;
                  gap: 0.25rem;
                  padding: 0.25rem 0.5rem;
                  background: #f8bbd0;
                  border: 2px solid #ec407a;
                  font-size: 0.625rem;
                  font-family: "DungGeunMo", monospace;
                  @media (min-width: 768px) {
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                  }
                `}
              >
                <Tag
                  css={css`
                    width: 0.75rem;
                    height: 0.75rem;
                  `}
                />
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
            padding-top: 1rem;
            border-top: 2px solid #fce4ec;
            @media (min-width: 768px) {
              gap: 0.75rem;
            }
          `}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 0.75rem;
              border: 2px solid black;
              box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
              transition: all 0.2s;
              font-family: "DungGeunMo", monospace;
              font-size: 0.75rem;
              @media (min-width: 768px) {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
              }
              ${isLiked
                ? css`
                    background: #e91e63;
                    color: white;
                  `
                : css`
                    background: white;
                    color: #e91e63;
                    &:hover {
                      background: #fce4ec;
                    }
                  `}
            `}
          >
            <Heart
              css={css`
                width: 1rem;
                height: 1rem;
                ${isLiked ? "fill: currentColor;" : ""}
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span>{likes}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 0.75rem;
              background: white;
              border: 2px solid black;
              box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
              color: #9c27b0;
              transition: all 0.2s;
              font-family: "DungGeunMo", monospace;
              font-size: 0.75rem;
              &:hover {
                background: #fce4ec;
              }
              @media (min-width: 768px) {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
              }
            `}
          >
            <MessageCircle
              css={css`
                width: 1rem;
                height: 1rem;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span>{comments}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 0.75rem;
              background: white;
              border: 2px solid black;
              box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
              color: #00bcd4;
              transition: all 0.2s;
              margin-left: auto;
              font-family: "DungGeunMo", monospace;
              font-size: 0.75rem;
              &:hover {
                background: #fce4ec;
              }
              @media (min-width: 768px) {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                span {
                  display: inline;
                }
              }
              span {
                display: none;
              }
            `}
          >
            <Share2
              css={css`
                width: 1rem;
                height: 1rem;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span>Share</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );

  if (onClick) {
    return CardContent;
  }

  return <Link href={post.route}>{CardContent}</Link>;
}
