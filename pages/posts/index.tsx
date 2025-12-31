import { loadPosts } from "../../lib/loadPosts";
import { RetroPostCard } from "../../components/RetroPostCard";
import { motion } from "framer-motion";
import { PenTool, Star, Sparkles } from "lucide-react";

export default function PostsIndex() {
  const posts = loadPosts();

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#9c27b0] via-[#e91e63] to-[#00bcd4] p-4 md:p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <h1
            className="text-white text-base md:text-xl text-center"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            PIXEL BLOG
          </h1>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
        </div>
        <p
          className="text-white/90 text-center text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          레트로 감성 블로그 • Retro Vibes Only
        </p>
      </motion.div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-8 text-center"
        >
          <p
            className="text-[#1a0033] text-sm md:text-base"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            포스트가 없습니다.
          </p>
        </motion.div>
      ) : (
        <div>
          {posts.map((post, index) => (
            <RetroPostCard
              key={post.route}
              post={post}
              delay={0.5 + index * 0.15}
            />
          ))}
        </div>
      )}

      {/* Categories Sidebar Box */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-4 md:p-6 mb-6 mt-8"
        >
          <h3
            className="text-[#e91e63] text-sm md:text-base mb-4 pb-2 border-b-2 border-[#fce4ec]"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            CATEGORIES
          </h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
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
                className="p-2 md:p-3 bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-2 border-[#ec407a] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] text-center"
              >
                <div
                  className="text-[10px] md:text-xs text-[#e91e63]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {cat.en}
                </div>
                <div
                  className="text-xs md:text-sm text-[#4a0066] mt-1"
                  style={{ fontFamily: "'DungGeunMo', monospace" }}
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
