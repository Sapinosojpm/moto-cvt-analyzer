"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_POSTS, BuildPost, BuildSetup, Comment } from '@/lib/communityStore';

import Modal from './Modal';

interface CommunityViewProps {
  onApplySetup: (setup: BuildSetup) => void;
  currentSetup: BuildSetup;
}

export default function CommunityView({ onApplySetup, currentSetup }: CommunityViewProps) {
  const [posts, setPosts] = useState<BuildPost[]>(INITIAL_POSTS);
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareTitle, setShareTitle] = useState("");
  const [shareDescription, setShareDescription] = useState("");

  const handleShareClick = () => {
    setShareTitle(`${currentSetup.profile.replace('_', ' ').toUpperCase()} Setup`);
    setShareDescription("Optimized for performance and stability.");
    setIsModalOpen(true);
  };

  const submitShare = () => {
    if (!shareTitle) return;

    const newPost: BuildPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: shareTitle,
      author: "Piga Rider",
      description: shareDescription || "My custom setup for optimal performance.",
      setup: { ...currentSetup },
      stats: {
        maxSpeed: 120, // Mock stats for the shared build
        acceleration: 90,
        efficiency: 95
      },
      comments: [],
      likes: 0,
      timestamp: Date.now()
    };

    setPosts(prev => [newPost, ...prev]);
    setIsModalOpen(false);
    setShareTitle("");
    setShareDescription("");
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText[postId]) return;
    
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: "Guest Rider",
      text: commentText[postId],
      timestamp: Date.now()
    };

    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
    ));
    setCommentText(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-black text-blue-400 uppercase tracking-widest">Global Build Feed</h2>
        <button 
          onClick={handleShareClick}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-full transition-colors shadow-lg shadow-blue-900/40"
        >
          + Share Your Build
        </button>
      </div>

      {/* Modal for Sharing Build */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Share Your Build"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Build Title</label>
            <input 
              type="text" 
              value={shareTitle}
              onChange={(e) => setShareTitle(e.target.value)}
              placeholder="e.g. Daily Commuter Setup"
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
            <textarea 
              value={shareDescription}
              onChange={(e) => setShareDescription(e.target.value)}
              placeholder="Describe how it feels..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Setup Preview</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Engine</span>
                <span className="text-xs font-mono text-blue-400">{currentSetup.engineCC}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Profile</span>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-tighter">{currentSetup.profile.replace('_', ' ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Weights</span>
                <span className="text-xs font-mono text-teal-400">{currentSetup.flyballWeights[0]}g x6</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Spring</span>
                <span className="text-xs font-mono text-teal-400">{currentSetup.centerSpring}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={submitShare}
              disabled={!shareTitle}
              className="flex-[2] py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40"
            >
              Share to Feed
            </button>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden"
          >
            <div className="p-5 flex flex-col md:flex-row gap-6">
              {/* Build Summary Left */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {post.author.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{post.title}</h4>
                      <p className="text-[10px] text-slate-500">by {post.author} • {new Date(post.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                    <span className="text-[9px] font-black text-red-500">PROJECT FI</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-3">
                  "{post.description}"
                </p>

                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 text-center">
                    <div className="text-[8px] text-slate-500 uppercase font-black">Weights</div>
                    <div className="text-xs font-mono text-blue-400">{post.setup.flyballWeights[0]}g</div>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 text-center">
                    <div className="text-[8px] text-slate-500 uppercase font-black">Spring</div>
                    <div className="text-xs font-mono text-blue-400">{post.setup.centerSpring}</div>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 text-center">
                    <div className="text-[8px] text-slate-500 uppercase font-black">Top Speed</div>
                    <div className="text-xs font-mono text-teal-400">{post.stats.maxSpeed}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => onApplySetup(post.setup)}
                    className="flex-1 py-1.5 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white text-[10px] font-bold rounded transition-all"
                  >
                    Apply This Setup
                  </button>
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-bold rounded flex items-center gap-2"
                  >
                    <span>🔥</span> {post.likes}
                  </button>
                </div>
              </div>

              {/* Comment Section Right */}
              <div className="w-full md:w-64 bg-slate-950/30 border-t md:border-t-0 md:border-l border-slate-800 p-4 space-y-4">
                <h5 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Feedback & Reviews</h5>
                
                <div className="space-y-3 h-32 overflow-y-auto pr-2 dashboard-scrollbar">
                  {post.comments.length > 0 ? (
                    post.comments.map(comment => (
                      <div key={comment.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-blue-500">{comment.author}</span>
                          <span className="text-[8px] text-slate-600">2h ago</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight bg-slate-800/40 p-1.5 rounded-md">
                          {comment.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full opacity-30">
                      <p className="text-[9px] uppercase font-bold text-slate-500">No feedback yet</p>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={commentText[post.id] || ""}
                    onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Wanna suggest?"
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[10px] rounded px-3 py-2 outline-none focus:border-blue-500 transition-colors"
                  />
                  <button 
                    onClick={() => handleAddComment(post.id)}
                    className="absolute right-2 top-1.5 text-blue-500 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .dashboard-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
