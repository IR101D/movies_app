import { useState } from 'react';
import Button from '@/components/commons/Button';
import {  Facebook, Twitter, Instagram, Apple, Mail, MessageCircle, Youtube, Phone } from 'lucide-react';
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: <Mail/>,
      title: 'Email Us',
      description: 'We\'ll reply within 24 hours',
      value: 'support@cineseek.com',
      action: () => window.open('mailto:support@cineseek.com')
    },
    {
      icon: <MessageCircle/>,
      title: 'Live Chat',
      description: 'Talk to our support team',
      value: 'Start Chat',
      action: () => console.log('Open live chat')
    },
    {
      icon: <Phone/>,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm',
      value: '+1 (555) 123-CINE',
      action: () => console.log('Initiate call')
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: '123 Movie Lane, Hollywood, CA',
      action: () => window.open('https://maps.google.com')
    }
  ];

  const faqs = [
    {
      question: "How do I report a technical issue?",
      answer: "Use the form above or email support@cineseek.com with details about the issue."
    },
    {
      question: "Can I suggest a movie to add to your platform?",
      answer: "Absolutely! We love movie suggestions. Use the 'Movie Suggestion' subject in the form."
    },
    {
      question: "How long does it take to get a response?",
      answer: "We typically respond within 24 hours during business days."
    },
    {
      question: "Do you have a mobile app?",
      answer: "Yes! Our mobile app is available on both iOS and Android stores."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0B15] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-[#1A1326] to-[#2D1B45] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`
              }}
            >
              {['📧', '💬', '📞', '📍', '🎬', '🌟'][i % 6]}
            </div>
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Get In <span className="text-[#E2D609]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Have questions about CineSeek? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 md:px-8 bg-[#0F0B15]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-[#171D22] p-6 rounded-2xl border border-gray-800 hover:border-[#E2D609] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                onClick={method.action}
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#E2D609]">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <p className="font-semibold group-hover:text-[#E2D609] transition-colors duration-300">
                  {method.value}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div className="bg-[#171D22] p-8 rounded-2xl border border-gray-800">
              <h2 className="text-3xl font-bold mb-2 text-[#E2D609]">Send us a Message</h2>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you soon.</p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-900 bg-opacity-20 border border-green-500 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-semibold text-green-400">Message Sent Successfully!</p>
                      <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0F0B15] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E2D609] transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0F0B15] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E2D609] transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0F0B15] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E2D609] transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="suggestion">Movie Suggestion</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0F0B15] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E2D609] transition-colors duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  title={isSubmitting ? "Sending..." : "Send Message"}
                  action={() => {}}
                 // type="submit"
                //  disabled={isSubmitting}
                  //className="w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* FAQ Section */}
              <div className="bg-[#171D22] p-6 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-[#E2D609]">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-800 pb-4 last:border-b-0">
                      <h4 className="font-semibold mb-2 text-white">{faq.question}</h4>
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#171D22] p-6 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-[#E2D609]">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Twitter', icon: <Twitter/>, color: 'hover:text-blue-400' },
                    { name: 'Instagram', icon: <Instagram/>, color: 'hover:text-pink-400' },
                    { name: 'Facebook', icon: <Facebook/>, color: 'hover:text-blue-600' },
                    { name: 'YouTube', icon: <Youtube/>, color: 'hover:text-red-500' }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#0F0B15] border border-gray-800 hover:border-[#E2D609] transition-all duration-300 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                      <span className={`font-semibold ${social.color} transition-colors duration-300`}>
                        {social.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-[#1A1326] to-[#2D1B45] p-6 rounded-2xl border border-[#E2D609] border-opacity-30">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h4 className="font-bold text-lg">Fast Response Time</h4>
                    <p className="text-gray-300 text-sm">Average response: <span className="text-[#E2D609]">2-4 hours</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#1A1326] to-[#2D1B45]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the <span className="text-[#E2D609]">Loop</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest movie updates, exclusive content, and platform news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#0F0B15] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E2D609] transition-colors duration-300"
            />
            <Button
              title="Subscribe"
              action={() => console.log('Subscribe')}
            //  className="px-8 py-3 whitespace-nowrap"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;