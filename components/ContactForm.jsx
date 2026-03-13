"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';


const ContactForm = () => {
  const { t } = useLanguage();
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('API Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden">
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
            <h3 className="text-2xl font-bold text-navy mb-4">{t('contact_form.success_title')}</h3>
            <p className="text-gray-500">{t('contact_form.success_message')}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t('contact_form.name_label')}</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact_form.name_placeholder')}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t('contact_form.email_label')}</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact_form.email_placeholder')}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t('contact_form.phone_label')}</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact_form.phone_placeholder')}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t('contact_form.subject_label')}</label>
                <input
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact_form.subject_placeholder')}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t('contact_form.message_label')}</label>
              <textarea
                required
                rows="3"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact_form.message_placeholder')}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-gold focus:ring-0 transition-all outline-none text-navy font-medium placeholder:text-gray-300 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-navy text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-gold hover:text-navy transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95 disabled:opacity-70 mt-2"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t('contact_form.sending')}
                </>
              ) : (
                <>
                  {t('contact_form.submit_button')}
                  <Send size={16} />
                </>
              )}
            </button>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-xs font-medium justify-center"
              >
                <AlertCircle size={14} />
                {t('contact_form.error_message')}
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
