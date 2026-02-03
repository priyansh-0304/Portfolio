import { useState, useCallback } from "react";
import { personalInfo } from "../../data";
import { Container, SectionHeader, Card, Button } from "../ui";
import { MailIcon, LocationIcon, GitHubIcon, SendIcon } from "../icons";

// Validation rules
const validators = {
  name: (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (value.trim().length > 50) return "Name must be less than 50 characters";
    return null;
  },
  email: (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return null;
  },
  message: (value) => {
    if (!value.trim()) return "Message is required";
    if (value.trim().length < 10) return "Message must be at least 10 characters";
    if (value.trim().length > 1000) return "Message must be less than 1000 characters";
    return null;
  },
};

// API endpoint - configure this for your backend
const CONTACT_API_ENDPOINT = "/api/contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const validator = validators[name];
    return validator ? validator(value) : null;
  }, []);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  }, [formData, validateField]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle input blur - validate on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // API call - ready for backend integration
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = Object.keys(validateForm()).length === 0 && 
    formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="py-24 section-alt">
      <Container>
        <SectionHeader
          subtitle="Let's Connect"
          title="Get In Touch"
          description="Have a project in mind or just want to chat? Feel free to reach out!"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Let's talk about everything!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <ContactItem
                icon={<MailIcon className="w-6 h-6" />}
                title="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactItem
                icon={<LocationIcon className="w-6 h-6" />}
                title="Location"
                value={personalInfo.location}
              />
              <ContactItem
                icon={<GitHubIcon className="w-6 h-6" />}
                title="GitHub"
                value="@priyansh-0304"
                href={personalInfo.github}
              />
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block pt-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-2xl blur-2xl opacity-20" />
                <Card variant="glass" className="relative p-6">
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "Great things are built with collaboration. Let's create something amazing together."
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card variant="elevated" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <FormField
                id="name"
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                placeholder="Enter full name"
                required
                autoComplete="name"
                maxLength={50}
              />

              {/* Email Field */}
              <FormField
                id="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                placeholder="Enter email address"
                required
                autoComplete="email"
              />

              {/* Message Field */}
              <FormField
                id="message"
                label="Message"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.message && errors.message}
                placeholder="Tell me about your project..."
                required
                rows={5}
                maxLength={1000}
                showCharCount
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isSubmitting}
                disabled={isSubmitting}
                icon={<SendIcon className="w-5 h-5" />}
                iconPosition="right"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {/* Status Messages */}
              <StatusMessage status={submitStatus} onDismiss={() => setSubmitStatus(null)} />
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}

// Form Field Component
function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  autoComplete,
  maxLength,
  rows,
  showCharCount,
}) {
  const isTextarea = type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";
  
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
    bg-slate-200 dark:bg-slate-800
    text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:outline-none focus:ring-0
    ${error 
      ? "border-rose-500 dark:border-rose-500 focus:border-rose-500" 
      : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
    }
    ${isTextarea ? "resize-none" : ""}
  `;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        <span>
          {label}
          {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
        </span>
        {showCharCount && maxLength && (
          <span className={`text-xs font-normal ${
            value.length > maxLength * 0.9 
              ? "text-rose-500" 
              : "text-slate-400 dark:text-slate-500"
          }`}>
            {value.length}/{maxLength}
          </span>
        )}
      </label>
      
      <InputComponent
        id={id}
        name={id}
        type={isTextarea ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses}
      />
      
      {/* Error Message */}
      {error && (
        <p 
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-sm text-rose-600 dark:text-rose-400"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// Status Message Component
function StatusMessage({ status, onDismiss }) {
  if (!status) return null;

  const config = {
    success: {
      bg: "bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800",
      text: "text-teal-800 dark:text-teal-200",
      icon: (
        <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Message sent successfully!",
      message: "Thank you for reaching out. I'll get back to you as soon as possible.",
    },
    error: {
      bg: "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800",
      text: "text-rose-800 dark:text-rose-200",
      icon: (
        <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Something went wrong",
      message: "Please try again later or contact me directly via email.",
    },
  };

  const { bg, text, icon, title, message } = config[status];

  return (
    <div 
      className={`p-4 rounded-xl border ${bg} animate-fade-in-up`}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div className="flex-1">
          <p className={`font-semibold ${text}`}>{title}</p>
          <p className={`text-sm mt-1 opacity-80 ${text}`}>{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${text}`}
          aria-label="Dismiss message"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Contact Item Component
function ContactItem({ icon, title, value, href }) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 p-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <p className="text-slate-900 dark:text-white font-semibold">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        className="group block p-2 -m-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {content}
      </a>
    );
  }

  return <div className="p-2 -m-2">{content}</div>;
}

/**
 * Submit contact form data to the backend
 * Replace this function with your actual API implementation
 * 
 * Example backends you can use:
 * - Formspree: https://formspree.io
 * - EmailJS: https://www.emailjs.com
 * - Custom API: Your own backend
 * - Netlify Forms: If deployed on Netlify
 * - Vercel Serverless: If deployed on Vercel
 */
async function submitContactForm(formData) {
  // Simulate API delay for demo purposes
  // Remove this in production
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Option 1: Use fetch to send to your API
  // Uncomment and configure when ready
  /*
  const response = await fetch(CONTACT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
  */

  // Option 2: Formspree integration
  // Replace 'YOUR_FORM_ID' with your Formspree form ID
  /*
  const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return { success: response.ok };
  */

  // Option 3: EmailJS integration
  // Configure with your EmailJS credentials
  /*
  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    },
    'YOUR_PUBLIC_KEY'
  );
  return { success: true };
  */

  // Demo mode: Always return success
  // Replace this with actual API call in production
  console.log("Form submitted:", formData);
  return { success: true };
}
