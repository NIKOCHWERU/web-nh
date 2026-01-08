"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS configurations
    // IMPORTANT: Get these from your EmailJS Dashboard (emailjs.com)
    // Replace 'service_xxx', 'template_xxx', and 'public_xxx' with your real keys
    const SERVICE_ID = 'service_f9ge48s'; // Service ID Anda
    const TEMPLATE_ID = 'template_12cgovq'; // Ganti dengan ID Template dari EmailJS Dashboard
    const PUBLIC_KEY = 'RLTxikJMOUsUjWClY'; // Ganti dengan Public Key Anda dari EmailJS Dashboard

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_email: 'niko.narasumberhukum@gmail.com'
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4">Pesan Terkirim!</h3>
            <p className="text-gray-500">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nama Lengkap</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Aktif</label>
                <input 
                   required
                   type="email" 
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   placeholder="name@example.com"
                   className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nomor WhatsApp</label>
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0812xxxx"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Subjek</label>
                <input 
                  required
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Apa yang ingin Anda bicarakan?"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Pesan</label>
              <textarea 
                required
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan detail pertanyaan atau masalah Anda..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full bg-navy text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:bg-gold hover:text-navy transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95 disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pesan Sekarang
                  <Send size={18} />
                </>
              )}
            </button>
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm font-medium justify-center"
              >
                <AlertCircle size={16} />
                Terjadi kesalahan. Silakan cek Service ID, Template ID, dan Public Key Anda di EmailJS.
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
