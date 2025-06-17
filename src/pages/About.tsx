
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// You can replace these image URLs with your local paths
const teamMembers = [
  { 
    name: 'Robert Green', 
    role: 'Founder & CEO', 
    img: '/images/Robert.jpeg',
    bio: 'With 10+ years in fashion industry, Robert founded Shirtify to revolutionize custom apparel.',
    email: 'robert@shirtify.com'
  },
  { 
    name: 'Marcus Blue', 
    role: 'Lead Designer', 
    img: './images/Marcus.jpg',
    bio: 'Creative genius behind our stunning designs. Marcus brings art to life on every piece.',
    email: 'marcus@shirtify.com'
  },
  { 
    name: 'Alex White', 
    role: 'Marketing Head', 
    img: '/images/Alex.jpg',
    bio: 'Strategic mastermind who connects our brand with customers worldwide.',
    email: 'alex@shirtify.com'
  },
];

const counters = [
  { label: 'Happy Customers', value: 5000, icon: '😊' },
  { label: 'Custom Designs', value: 1200, icon: '🎨' },
  { label: 'Team Members', value: 15, icon: '👥' },
  { label: 'Countries Served', value: 25, icon: '🌍' },
];

const values = [
  {
    title: 'Quality First',
    description: 'We use only premium materials and cutting-edge printing technology to ensure every product meets our high standards.',
    icon: '⭐'
  },
  {
    title: 'Customer Centric',
    description: 'Your satisfaction is our priority. We listen, adapt, and deliver exactly what you envision.',
    icon: '❤️'
  },
  {
    title: 'Innovation',
    description: 'Constantly pushing boundaries with new designs, materials, and customization options.',
    icon: '🚀'
  },
  {
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices and responsible manufacturing for a better tomorrow.',
    icon: '🌱'
  }
];

const milestones = [
  { year: '2018', event: 'Shirtify Founded', description: 'Started with a vision to democratize custom fashion' },
  { year: '2019', event: 'First 1000 Orders', description: 'Reached our first major milestone with overwhelming support' },
  { year: '2021', event: 'International Expansion', description: 'Extended our services to 15+ countries worldwide' },
  { year: '2023', event: 'Eco-Friendly Initiative', description: 'Launched sustainable materials and carbon-neutral shipping' },
  { year: '2024', event: 'AI Design Assistant', description: 'Introduced cutting-edge AI to help customers create perfect designs' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="px-4 py-16 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8 text-center"
        >
          About Shirtify
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-12 max-w-4xl"
        >
          <img
            src="/images/About-us.jpg"
            alt="About Shirtify"
            className="rounded-2xl w-full shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="px-4 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="space-y-4 text-white text-lg leading-relaxed text-left">
              <p>
                Shirtify began with a simple belief: everyone deserves to wear something that's uniquely theirs. What started 
                as a small dream in a garage has grown into a global movement that empowers creativity and self-expression 
                through personalized fashion.
              </p>
              <p>
                We're not just another clothing brand. We're innovators, dreamers, and perfectionists who understand that 
                every design tells a story. Whether it's a custom t-shirt that represents your personality, a branded cap 
                for your business, or a unique gift for someone special, we craft each piece with precision and passion.
              </p>
              <p>
                Our journey has been incredible - from our humble beginnings to serving thousands of customers across 
                25+ countries. But what drives us isn't just growth; it's the smile on our customers' faces when they 
                receive that perfect piece they envisioned.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Shirtify?</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> Premium quality materials</li>
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> Lightning-fast delivery</li>
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> 24/7 customer support</li>
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> Unlimited design revisions</li>
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> Eco-friendly practices</li>
              <li className="flex items-center"><span className="text-blue-400 mr-3">✓</span> Global shipping</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Animated Counters */}
      <div className="px-4 py-16 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Impact in Numbers
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {counters.map((counter, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 * index, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-4xl mb-2">{counter.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{counter.value.toLocaleString()}+</h3>
                <p className="text-lg">{counter.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400">{value.title}</h3>
                  <p className="text-white leading-relaxed text-left">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-4 py-16 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center">
                  {milestone.year}
                </div>
                <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{milestone.event}</h3>
                  <p className="text-white text-left">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Meet Our Dream Team
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
          Behind every great product is an even greater team. Meet the passionate individuals who make Shirtify magic happen every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="relative mb-4">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
              <p className="text-blue-400 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-300 text-sm mb-4 text-left">{member.bio}</p>
              <a 
                href={`mailto:${member.email}`}
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm"
              >
                {member.email}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-4 py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-white text-xl leading-relaxed mb-8">
              "To empower every individual and business to express their unique identity through high-quality, 
              personalized apparel that not only looks amazing but tells their story to the world."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full">#CustomFashion</span>
              <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">#QualityFirst</span>
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full">#Sustainable</span>
              <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full">#Innovation</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Create Something Amazing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Shirtify their go-to destination for custom apparel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg font-semibold"
            >
              Start Designing Now
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;