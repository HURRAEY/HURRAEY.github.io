import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Clock, User, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { Post } from "../lib/types";

interface PostCardProps {
  post: Post;
  delay?: number;
}

// 태그 문자열을 배열로 변환
function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString.split(",").map((tag) => tag.trim()).filter(Boolean);
}

// 색상 그라데이션 선택 함수
function getColorGradient(index: number): string {
  const colors = [
    "from-[#e91e63] to-[#f06292]",
    "from-[#9c27b0] to-[#ba68c8]",
    "from-[#00bcd4] to-[#4dd0e1]",
    "from-[#4caf50] to-[#81c784]",
    "from-[#ff9800] to-[#ffb74d]",
    "from-[#f44336] to-[#e57373]",
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

export function RetroPostCard({ post, delay = 0 }: PostCardProps) {
  const [likes, setLikes] = useState(getInitialLikes(post));
  const [isLiked, setIsLiked] = useState(false);
  const tags = parseTags(post.tag);
  const color = getColorGradient(
    post.title.charCodeAt(0) % 6
  );
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

  return (
    <Link href={post.route}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden mb-4 md:mb-6 cursor-pointer"
      >
        {/* Header Bar */}
        <div
          className={`bg-gradient-to-r ${color} p-3 md:p-4 border-b-4 border-black`}
        >
          <h2
            className="text-white text-sm md:text-base mb-1"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {post.title.toUpperCase()}
          </h2>
        </div>

        {/* Meta Info */}
        <div className="bg-[#fce4ec] p-2 md:p-3 border-b-2 border-[#ec407a] flex flex-wrap gap-2 md:gap-4 text-xs">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 md:w-4 md:h-4 text-[#e91e63]" />
            <span style={{ fontFamily: "'DungGeunMo', monospace" }}>
              HURRAEY
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
            <span style={{ fontFamily: "'VT323', monospace" }}>{post.date}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <p
            className="text-[#1a0033] text-xs md:text-sm leading-relaxed mb-4"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {post.description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-[#f8bbd0] border-2 border-[#ec407a] text-[10px] md:text-xs"
                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3 pt-4 border-t-2 border-[#fce4ec]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                isLiked
                  ? "bg-[#e91e63] text-white"
                  : "bg-white text-[#e91e63] hover:bg-[#fce4ec]"
              }`}
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? "fill-current" : ""}`}
              />
              <span
                className="text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {likes}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0] hover:bg-[#fce4ec] transition-colors"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span
                className="text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {comments}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#00bcd4] hover:bg-[#fce4ec] transition-colors ml-auto"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              <span
                className="text-xs md:text-sm hidden md:inline"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                Share
              </span>
            </motion.button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

