import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Carbon Footprints: What You Need to Know",
      excerpt: "Understanding the fundamentals of carbon emissions and how individual actions contribute to global climate change.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Science",
      image: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
      excerpt: "Practical, actionable steps you can take immediately to start reducing your environmental impact.",
      author: "Alex Green",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Tips",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "The Future of Carbon Offsetting: Trends and Technologies",
      excerpt: "Exploring emerging technologies and methodologies in carbon offset projects worldwide.",
      author: "Michael Torres",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Technology",
      image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Community Impact: How Group Challenges Drive Change",
      excerpt: "Real stories from Carbon Compass users who achieved remarkable results through community challenges.",
      author: "Emma Rodriguez",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Community",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      title: "Sustainable Transportation: Beyond Electric Vehicles",
      excerpt: "Exploring diverse transportation options that can significantly reduce your carbon footprint.",
      author: "James Wilson",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Transport",
      image: "https://images.pexels.com/photos/1751279/pexels-photo-1751279.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      title: "The Psychology of Environmental Behavior Change",
      excerpt: "Understanding the mental factors that drive sustainable lifestyle choices and how to leverage them.",
      author: "Dr. Lisa Park",
      date: "2024-01-03",
      readTime: "11 min read",
      category: "Psychology",
      image: "https://images.pexels.com/photos/4173137/pexels-photo-4173137.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const categories = ["All", "Science", "Tips", "Technology", "Community", "Transport", "Psychology"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Carbon Compass Blog</h1>
        <p className="text-gray-600">
          Insights, tips, and stories about sustainable living and climate action.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="text-white bg-primary px-3 py-1 rounded-full text-sm inline-block mb-3 w-max">
              Featured
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">{blogPosts[0].title}</h2>
            <p className="text-white/90 mb-4 max-w-2xl">{blogPosts[0].excerpt}</p>
            <div className="flex items-center text-white/80 text-sm mb-4">
              <User size={16} className="mr-2" />
              <span className="mr-4">{blogPosts[0].author}</span>
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">{blogPosts[0].date}</span>
              <Clock size={16} className="mr-2" />
              <span>{blogPosts[0].readTime}</span>
            </div>
            <Link 
              to={`/blog/${blogPosts[0].id}`}
              className="btn btn-primary w-max flex items-center"
            >
              Read Article <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-primary-light/20 text-primary px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              <Link 
                to={`/blog/${post.id}`}
                className="text-primary font-medium flex items-center hover:underline"
              >
                Read More <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest insights on sustainable living, 
          climate science, and carbon reduction strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input flex-1"
          />
          <button className="btn btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;