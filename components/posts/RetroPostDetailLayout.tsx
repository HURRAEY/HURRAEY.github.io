/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  User,
  Tag,
} from "lucide-react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import type { Post } from "../../lib/types";

interface RetroPostDetailLayoutProps {
  post: Post;
  children: React.ReactNode;
}

// 태그 문자열을 배열로 변환
function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// 간단한 해시 함수 (서버/클라이언트에서 동일한 값 생성)
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getInitialLikes(post: Post): number {
  const hash = simpleHash(post.route + post.title);
  return 50 + (hash % 200);
}

function getInitialViews(post: Post): number {
  const hash = simpleHash(post.route + post.date);
  return 500 + (hash % 5000);
}

export function RetroPostDetailLayout({
  post,
  children,
}: RetroPostDetailLayoutProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(() => getInitialLikes(post));
  const [isLiked, setIsLiked] = useState(false);

  const tags = useMemo(() => parseTags(post.tag), [post.tag]);
  const views = useMemo(() => getInitialViews(post), [post]);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/posts");
    }
  };

  return (
    <div
      css={css`
        width: 100%;
        max-width: 64rem;
        margin: 1.5rem auto 0;
        padding: 0 1rem;
        @media (min-width: 768px) {
          margin-top: 2rem;
        }
      `}
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        css={css`
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          background: white;
          border: 4px solid black;
          box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
          color: #e91e63;
          font-family: "DungGeunMo", monospace;
          font-size: 0.75rem;
          @media (min-width: 768px) {
            padding: 0.75rem 1.25rem;
            margin-bottom: 1.25rem;
            font-size: 0.875rem;
          }
        `}
      >
        <ArrowLeft
          css={css`
            width: 1rem;
            height: 1rem;
            @media (min-width: 768px) {
              width: 1.25rem;
              height: 1.25rem;
            }
          `}
        />
        <span>목록으로 • Back to List</span>
      </motion.button>

      {/* Main Post Container */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        css={css`
          background: white;
          border: 4px solid black;
          box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
        `}
      >
        {/* Header */}
        <div
          css={css`
            background: linear-gradient(
              to right,
              #e91e63,
              #f06292,
              #ba68c8
            );
            padding: 1rem;
            border-bottom: 4px solid black;
            @media (min-width: 768px) {
              padding: 1.5rem 1.75rem;
            }
          `}
        >
          <h1
            css={css`
              color: white;
              font-size: 1rem;
              margin: 0 0 0.5rem;
              font-family: "Press Start 2P", monospace;
              line-height: 1.6;
              text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
              @media (min-width: 768px) {
                font-size: 1.25rem;
              }
            `}
          >
            {post.title}
          </h1>
          {post.description && (
            <p
              css={css`
                color: rgba(255, 255, 255, 0.9);
                margin: 0;
                font-size: 0.875rem;
                font-family: "DungGeunMo", monospace;
                @media (min-width: 768px) {
                  font-size: 1rem;
                }
              `}
            >
              {post.description}
            </p>
          )}
        </div>

        {/* Meta Info */}
        <div
          css={css`
            background: #fce4ec;
            padding: 0.75rem 1rem;
            border-bottom: 2px solid #ec407a;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            font-size: 0.75rem;
            @media (min-width: 768px) {
              padding: 0.875rem 1.75rem;
              gap: 1rem;
              font-size: 0.875rem;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.35rem;
            `}
          >
            <User
              css={css`
                width: 1rem;
                height: 1rem;
                color: #e91e63;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span
              css={css`
                font-family: "DungGeunMo", monospace;
              `}
            >
              HURRAEY
            </span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.35rem;
            `}
          >
            <Clock
              css={css`
                width: 1rem;
                height: 1rem;
                color: #9c27b0;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span
              css={css`
                font-family: "VT323", monospace;
              `}
            >
              {post.date}
            </span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.35rem;
            `}
          >
            <MessageCircle
              css={css`
                width: 1rem;
                height: 1rem;
                color: #00bcd4;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span
              css={css`
                font-family: "VT323", monospace;
              `}
            >
              {views.toLocaleString()} views
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          css={css`
            padding: 1.25rem 1rem 1.5rem;
            @media (min-width: 768px) {
              padding: 2rem 2rem 2.5rem;
            }
          `}
        >
          {/* MDX/Markdown Content */}
          <div
            css={css`
              font-family: "DungGeunMo", monospace;
              font-size: 0.875rem;
              color: #1a0033;
              line-height: 1.7;
              & h1,
              & h2,
              & h3,
              & h4,
              & h5,
              & h6 {
                font-family: "Press Start 2P", monospace;
                color: #e91e63;
              }
            `}
          >
            {children}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 2rem;
                padding-top: 1.25rem;
                border-top: 2px solid #fce4ec;
              `}
            >
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  css={css`
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.35rem 0.75rem;
                    background: #f8bbd0;
                    border: 2px solid #ec407a;
                    font-size: 0.75rem;
                    font-family: "DungGeunMo", monospace;
                  `}
                >
                  <Tag
                    css={css`
                      width: 0.9rem;
                      height: 0.9rem;
                    `}
                  />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div
          css={css`
            padding: 0.75rem 1rem 1rem;
            border-top: 4px solid #fce4ec;
            background: linear-gradient(to right, #fce4ec, white);
            @media (min-width: 768px) {
              padding: 1.25rem 1.75rem 1.5rem;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              gap: 0.75rem;
              flex-wrap: wrap;
            `}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              css={css`
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border: 3px solid black;
                box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
                font-family: "DungGeunMo", monospace;
                font-size: 0.875rem;
                transition: all 0.2s;
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
                  width: 1.25rem;
                  height: 1.25rem;
                  ${isLiked ? "fill: currentColor;" : ""}
                `}
              />
              <span>{likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              css={css`
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: white;
                border: 3px solid black;
                box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
                color: #9c27b0;
                font-family: "DungGeunMo", monospace;
                font-size: 0.875rem;
                transition: all 0.2s;
                &:hover {
                  background: #fce4ec;
                }
              `}
            >
              <MessageCircle
                css={css`
                  width: 1.25rem;
                  height: 1.25rem;
                `}
              />
              <span>Comments</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              css={css`
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: white;
                border: 3px solid black;
                box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
                color: #00bcd4;
                font-family: "DungGeunMo", monospace;
                font-size: 0.875rem;
                margin-left: auto;
                transition: all 0.2s;
                &:hover {
                  background: #fce4ec;
                }
              `}
            >
              <Share2
                css={css`
                  width: 1.25rem;
                  height: 1.25rem;
                `}
              />
              <span>공유 • Share</span>
            </motion.button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}


