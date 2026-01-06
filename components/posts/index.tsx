/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { loadPosts } from "../../lib/loadPosts";
import { RetroPostCard } from "./RetroPostCard";
import { motion } from "framer-motion";
import { PenTool, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PostsIndex() {
  const posts = loadPosts();

  return (
    <div
      css={css`
        width: 100%;
        max-width: 56rem;
        margin: 0 auto;
        margin-top: 1.5rem;
        padding: 0 1rem;
        @media (min-width: 768px) {
          margin-top: 2rem;
        }
      `}
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        css={css`
          background: linear-gradient(to right, #9c27b0, #e91e63, #00bcd4);
          padding: 1rem;
          border: 4px solid black;
          box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
          margin-bottom: 1.5rem;
          @media (min-width: 768px) {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
          `}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star
              css={css`
                width: 1.5rem;
                height: 1.5rem;
                color: #fbbf24;
                fill: #fbbf24;
                @media (min-width: 768px) {
                  width: 2rem;
                  height: 2rem;
                }
              `}
            />
          </motion.div>
          <h1
            css={css`
              color: white !important;
              font-size: 1rem;
              text-align: center;
              font-family: "Press Start 2P", monospace;
              margin: 0;
              padding: 0;
              line-height: 1.5;
              text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
              z-index: 1;
              position: relative;
              @media (min-width: 768px) {
                font-size: 1.25rem;
              }
            `}
          >
            PIXEL BLOG
          </h1>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles
              css={css`
                width: 1.5rem;
                height: 1.5rem;
                color: #fbbf24;
                @media (min-width: 768px) {
                  width: 2rem;
                  height: 2rem;
                }
              `}
            />
          </motion.div>
        </div>
        <p
          css={css`
            color: rgba(255, 255, 255, 0.9);
            text-align: center;
            font-size: 0.75rem;
            font-family: "DungGeunMo", monospace;
            @media (min-width: 768px) {
              font-size: 0.875rem;
            }
          `}
        >
          레트로 감성 블로그 • Retro Vibes Only
        </p>
      </motion.div>

      {/* New Post Button */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          css={css`
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: flex-end;
          `}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 1rem;
              background: linear-gradient(to right, #e91e63, #f06292);
              color: white;
              border: 4px solid black;
              box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
              font-family: "DungGeunMo", monospace;
              font-size: 0.75rem;
              @media (min-width: 768px) {
                padding: 0.75rem 1.5rem;
                font-size: 0.875rem;
              }
            `}
          >
            <PenTool
              css={css`
                width: 1rem;
                height: 1rem;
                @media (min-width: 768px) {
                  width: 1.25rem;
                  height: 1.25rem;
                }
              `}
            />
            <span>새 글쓰기 • Write</span>
          </motion.button>
        </motion.div>
      )}

      {/* Posts List + Featured Markdown Post */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          css={css`
            background: white;
            border: 4px solid black;
            box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            text-align: center;
          `}
        >
          <p
            css={css`
              color: #1a0033;
              font-size: 0.875rem;
              font-family: "DungGeunMo", monospace;
              @media (min-width: 768px) {
                font-size: 1rem;
              }
            `}
          >
            포스트가 없습니다.
          </p>
        </motion.div>
      ) : (
        <div>
          {/* Featured Markdown Post (Markdown Examples) */}
          <Link href="/posts/markdown" passHref legacyBehavior>
            <a
              css={css`
                text-decoration: none;
                color: inherit;
                display: block;
                margin-bottom: 1.5rem;
              `}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
                css={css`
                  cursor: pointer;
                `}
              >
                <div
                  css={css`
                    background: linear-gradient(
                      to bottom right,
                      #ffe4e1,
                      #ffffff,
                      #ffb6c1
                    );
                    border: 4px solid #ff1493;
                    box-shadow: 8px 8px 0px 0px rgba(255, 20, 147, 0.5);
                    overflow: hidden;
                    image-rendering: pixelated;
                  `}
                >
                  {/* Featured Badge */}
                  <div
                    css={css`
                      background: linear-gradient(
                        to right,
                        #ff1493,
                        #ff69b4
                      );
                      padding: 0.5rem 0.75rem;
                      border-bottom: 3px solid #c2185b;
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                    `}
                  >
                    <Star
                      css={css`
                        width: 1rem;
                        height: 1rem;
                        color: #fbbf24;
                        fill: #fbbf24;
                        image-rendering: pixelated;
                      `}
                    />
                    <span
                      css={css`
                        color: white;
                        font-size: 0.75rem;
                        font-family: "Press Start 2P", monospace;
                      `}
                    >
                      FEATURED POST
                    </span>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles
                        css={css`
                          width: 1rem;
                          height: 1rem;
                          color: #fbbf24;
                          image-rendering: pixelated;
                        `}
                      />
                    </motion.div>
                  </div>

                  <div
                    css={css`
                      padding: 1rem;
                      @media (min-width: 768px) {
                        padding: 1.5rem;
                      }
                    `}
                  >
                    <h3
                      css={css`
                        color: #ff1493;
                        font-size: 1rem;
                        margin-bottom: 0.5rem;
                        font-family: "Press Start 2P", monospace;
                        @media (min-width: 768px) {
                          font-size: 1.125rem;
                        }
                      `}
                    >
                      Markdown Examples
                    </h3>
                    <p
                      css={css`
                        color: #c2185b;
                        font-size: 0.875rem;
                        margin-bottom: 0.75rem;
                        font-family: "DungGeunMo", monospace;
                      `}
                    >
                      마크다운 옵션의 모든 예제 보기 • View examples of all
                      possible Markdown options
                    </p>

                    <div
                      css={css`
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        margin-bottom: 0.75rem;
                      `}
                    >
                      <span
                        css={css`
                          padding: 0.25rem 0.5rem;
                          background: #ffb6c1;
                          border: 2px solid #ff1493;
                          font-size: 0.625rem;
                          font-family: "Press Start 2P", monospace;
                          image-rendering: pixelated;
                        `}
                      >
                        web development
                      </span>
                      <span
                        css={css`
                          padding: 0.25rem 0.5rem;
                          background: #ffe4e1;
                          border: 2px solid #ff1493;
                          font-size: 0.625rem;
                          font-family: "Press Start 2P", monospace;
                          image-rendering: pixelated;
                        `}
                      >
                        markdown
                      </span>
                      <span
                        css={css`
                          padding: 0.25rem 0.5rem;
                          background: #ffc0cb;
                          border: 2px solid #ff1493;
                          font-size: 0.625rem;
                          font-family: "Press Start 2P", monospace;
                          image-rendering: pixelated;
                        `}
                      >
                        tutorial
                      </span>
                    </div>

                    <div
                      css={css`
                        display: flex;
                        flex-wrap: wrap;
                        gap: 1rem;
                        font-size: 0.75rem;
                        color: #9c27b0;
                        font-family: "VT323", monospace;
                      `}
                    >
                      <span>👤 You</span>
                      <span>📅 2021/3/19</span>
                      <span>👁️ 1,234 views</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          </Link>

          {/* Regular Posts */}
          {posts.map((post, index) => (
            <RetroPostCard
              key={post.route}
              post={post}
              delay={0.5 + index * 0.15}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            @media (min-width: 768px) {
              margin-top: 2rem;
            }
          `}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            css={css`
              padding: 0.75rem 1.5rem;
              background: white;
              border: 4px solid black;
              box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
              color: #9c27b0;
              @media (min-width: 768px) {
                padding: 1rem 2rem;
              }
            `}
          >
            <span
              css={css`
                font-size: 0.75rem;
                font-family: "Press Start 2P", monospace;
                @media (min-width: 768px) {
                  font-size: 0.875rem;
                }
              `}
            >
              LOAD MORE
            </span>
            <div
              css={css`
                font-size: 0.625rem;
                margin-top: 0.25rem;
                font-family: "DungGeunMo", monospace;
                @media (min-width: 768px) {
                  font-size: 0.75rem;
                }
              `}
            >
              더 보기
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Categories Sidebar Box */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          css={css`
            background: white;
            border: 4px solid #ec407a;
            box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
            padding: 1rem;
            margin-bottom: 1.5rem;
            margin-top: 2rem;
            @media (min-width: 768px) {
              padding: 1.5rem;
            }
          `}
        >
          <h3
            css={css`
              color: #e91e63;
              font-size: 0.875rem;
              margin-bottom: 1rem;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid #fce4ec;
              font-family: "Press Start 2P", monospace;
              @media (min-width: 768px) {
                font-size: 1rem;
              }
            `}
          >
            CATEGORIES
          </h3>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.5rem;
              @media (min-width: 768px) {
                gap: 0.75rem;
              }
            `}
          >
            {[
              { ko: "픽셀아트", en: "Pixel Art" },
              { ko: "음악", en: "Music" },
              { ko: "게임", en: "Gaming" },
              { ko: "디자인", en: "Design" },
              { ko: "코딩", en: "Coding" },
              { ko: "리뷰", en: "Review" },
            ].map((cat, i) => (
              <motion.button
                key={cat.en}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                css={css`
                  padding: 0.5rem;
                  background: linear-gradient(to bottom right, #f8bbd0, #fce4ec);
                  border: 2px solid #ec407a;
                  box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.2);
                  text-align: center;
                  @media (min-width: 768px) {
                    padding: 0.75rem;
                  }
                `}
              >
                <div
                  css={css`
                    font-size: 0.625rem;
                    color: #e91e63;
                    font-family: "Press Start 2P", monospace;
                    @media (min-width: 768px) {
                      font-size: 0.75rem;
                    }
                  `}
                >
                  {cat.en}
                </div>
                <div
                  css={css`
                    font-size: 0.75rem;
                    color: #4a0066;
                    margin-top: 0.25rem;
                    font-family: "DungGeunMo", monospace;
                    @media (min-width: 768px) {
                      font-size: 0.875rem;
                    }
                  `}
                >
                  {cat.ko}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}





