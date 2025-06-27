import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { mockLeaderboard } from '../data/mockData';
import { Award, Lightbulb, HelpCircle, Filter, Image, Send, Flag, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CommunityPost } from '../types';

const CommunityPage: React.FC = () => {
  const { communityPosts, user, addCommunityPost, toggleLike } = useApp();
  const [newPostContent, setNewPostContent] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'achievement' | 'tip' | 'question'>('all');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const filteredPosts = activeFilter === 'all' ? communityPosts : communityPosts.filter(post => post.category === activeFilter);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim() && user) {
      const newPost: CommunityPost = {
        id: uuidv4(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatarUrl,
        content: newPostContent,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        likedBy: [],
        comments: [],
        category: 'general',
        tags: [],
      };
      addCommunityPost(newPost);
      setNewPostContent('');
    }
  };

  const handleToggleComments = (postId: string) => {
    setShowComments(showComments === postId ? null : postId);
    setCommentText('');
  };

  const handleAddComment = (postId: string) => {
    if (commentText.trim() && user) {
      alert('Comment added successfully! (Actual comment functionality would be implemented in a complete app)');
      setCommentText('');
      setShowComments(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-gray-600">Connect with other members, share your sustainability journey, and get inspired.</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <form onSubmit={handlePostSubmit}>
              <div className="flex items-start mb-4">
                <img src={user?.avatarUrl || 'https://via.placeholder.com/40'} alt="Your avatar" className="w-10 h-10 rounded-full object-cover mr-3" />
                <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Share your sustainability journey or ask a question..." className="input w-full h-24 resize-none" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><Image size={20} /></button>
                  <span className="text-sm text-gray-500">Add photo</span>
                </div>
                <button type="submit" disabled={!newPostContent.trim()} className={`btn ${newPostContent.trim() ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Post</button>
              </div>
            </form>
          </div>
          <div className="mb-6 flex items-center">
            <Filter size={16} className="mr-2 text-gray-500" />
            <span className="text-sm text-gray-600 mr-3">Filter:</span>
            <div className="flex space-x-2">
              <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} label="All Posts" />
              <FilterButton active={activeFilter === 'achievement'} onClick={() => setActiveFilter('achievement')} label="Achievements" icon={<Award size={16} />} />
              <FilterButton active={activeFilter === 'tip'} onClick={() => setActiveFilter('tip')} label="Tips" icon={<Lightbulb size={16} />} />
              <FilterButton active={activeFilter === 'question'} onClick={() => setActiveFilter('question')} label="Questions" icon={<HelpCircle size={16} />} />
            </div>
          </div>
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div><h3 className="font-medium">{post.userName}</h3><p className="text-xs text-gray-500">{post.date}</p></div>
                  </div>
                  {post.category !== 'general' && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.category === 'achievement' ? 'bg-green-100 text-green-800' : post.category === 'tip' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                      {post.category}
                    </span>
                  )}
                </div>
                <p className="mb-4">{post.content}</p>
                {post.image && <img src={post.image} alt="Post attachment" className="w-full h-auto rounded-lg mb-4" />}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">#{tag}</span>)}
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center space-x-1 p-2 rounded-md ${post.likedBy.includes(user?.id || '') ? 'text-primary font-medium' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <Award size={16} className={post.likedBy.includes(user?.id || '') ? 'fill-primary' : ''} />
                    <span>{post.likes}</span>
                  </button>
                  <button onClick={() => handleToggleComments(post.id)} className="flex items-center space-x-1 p-2 rounded-md text-gray-500 hover:bg-gray-100"><HelpCircle size={16} /><span>{post.comments.length}</span></button>
                  <button className="flex items-center space-x-1 p-2 rounded-md text-gray-500 hover:bg-gray-100"><Flag size={16} /><span>Share</span></button>
                  <button className="flex items-center space-x-1 p-2 rounded-md text-gray-500 hover:bg-gray-100"><Trash2 size={16} /><span>Report</span></button>
                </div>
                {showComments === post.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">Comments</h4>
                    {post.comments.length > 0 ? (
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start">
                            <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full object-cover mr-2" />
                            <div className="bg-gray-50 rounded-lg p-3 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="text-sm font-medium">{comment.userName}</h5>
                                <span className="text-xs text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-sm text-gray-500 mb-4">No comments yet.</p>}
                    <div className="flex items-start">
                      <img src={user?.avatarUrl || 'https://via.placeholder.com/32'} alt="Your avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
                      <div className="flex-1 relative">
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="input w-full h-20 pr-12 resize-none" />
                        <button onClick={() => handleAddComment(post.id)} disabled={!commentText.trim()} className={`absolute right-2 bottom-2 p-2 rounded-full ${commentText.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center"><p className="text-gray-500">No posts found for this filter.</p></div>
            )}
          </motion.div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center"><Award className="w-5 h-5 text-primary mr-2" /> Leaderboard</h2>
            <div className="space-y-4">
              {mockLeaderboard.map((leader, index) => (
                <div key={leader.id} className="flex items-center justify-between">
                  <div className="flex items-center"><div className="w-6 text-center font-bold text-gray-600">{index + 1}</div><img src={leader.avatarUrl} alt={leader.name} className="w-8 h-8 rounded-full object-cover mx-3" /><div><h3 className="font-medium text-sm">{leader.name}</h3><p className="text-xs text-gray-500">{leader.reductionPercent}% reduction</p></div></div>
                  <div className="font-bold text-primary">{leader.points}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t"><button className="text-primary text-sm font-medium hover:underline flex items-center justify-center w-full">View Full Leaderboard</button></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Active Challenges</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4"><h3 className="font-medium mb-2">Meatless Monday Challenge</h3><div className="flex justify-between items-center text-sm mb-2"><span className="text-gray-600">Progress:</span><span className="font-medium">2/4 weeks</span></div><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full" style={{ width: '50%' }}></div></div><p className="text-xs text-gray-500 mt-2">21 participants • Ends in 14 days</p></div>
              <div className="border rounded-lg p-4"><h3 className="font-medium mb-2">Zero Waste Week</h3><div className="flex justify-between items-center text-sm mb-2"><span className="text-gray-600">Progress:</span><span className="font-medium">3/7 days</span></div><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full" style={{ width: '43%' }}></div></div><p className="text-xs text-gray-500 mt-2">47 participants • Ends in 4 days</p></div>
            </div>
            <div className="mt-4 pt-4 border-t"><button className="text-primary text-sm font-medium hover:underline flex items-center justify-center w-full">Find More Challenges</button></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Community Guidelines</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><span className="text-primary mr-2">•</span>Be respectful and supportive of other members</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span>Share authentic experiences and achievements</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span>Post constructive and relevant content</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span>Avoid promotional or spam content</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span>Report inappropriate content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label, icon }) => (
  <button onClick={onClick} className={`text-xs px-3 py-1 rounded-full flex items-center space-x-1 ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </button>
);

export default CommunityPage;