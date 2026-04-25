import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageCode = 'en' | 'hi';

type TranslationParams = Record<string, string | number | undefined>;

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'quenrix_lang';
  private readonly languageSubject = new BehaviorSubject<LanguageCode>(this.readInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  private readonly translations: Record<LanguageCode, Record<string, string>> = {
    en: {
      // Header
      'header.courses': 'Courses',
      'header.careers': 'Careers',
      'header.blog': 'Blog',
      'header.contact': 'Contact',
      'header.login': 'Log In',
      'header.menu': 'Menu',
      'header.back': 'Back',
      'header.allCourses': 'All Courses',
      'header.loading': 'Loading...',
      'header.loadingCourses': 'Loading courses...',
      'header.enrollNow': 'Enroll Now',
      'header.startJourneyIn': 'Start your journey in {{course}}',
      'header.note': 'Note:',
      'header.enrollNote': 'If you want more details regarding the course, please fill out this form to enroll. Our expert will call you.',
      'header.fullName': 'Full Name',
      'header.emailAddress': 'Email Address',
      'header.phoneNumber': 'Phone Number',
      'header.requestCallback': 'Request Callback',
      'header.submitting': 'Submitting...',
      'header.language': 'Language',
      'header.english': 'English',
      'header.hindi': 'Hindi',

      // Hero
      'hero.kicker': 'Quenrix Career Acceleration Platform',
      'hero.titleStart': 'Build Skills. Get',
      'hero.titleHighlight': 'Hired',
      'hero.titleEnd': 'Start Your Tech Career.',
      'hero.subtitle': 'Master in-demand programming skills with interactive courses and land your dream job with guaranteed placements. Join thousands of successful developers who transformed their careers.',
      'hero.aboutBtn': 'About Quenrix',
      'hero.rating': '4.8/5 rated by learners',
      'hero.learners': '10,000+ active learners',
      'hero.livePreview': 'Live Preview',
      'hero.output': 'Output:',

      // Demo classes
      'demo.title': 'Watch Our Free Demo Classes',
      'demo.subtitle': 'Experience world-class teaching before you enroll.',
      'demo.instructor': 'Instructor',
      'demo.readMore': 'Read More',
      'demo.showLess': 'Show Less',

      // Chatbot
      'chat.inputPlaceholder': 'Type your question...',
      'chat.send': 'Send',
      'chat.welcome': 'Hi! 👋 I am the Quenrix Assistant. You can ask me about courses, demo classes, placements, or study notes.',
      'chat.quickQ1': 'Which course is best for beginners?',
      'chat.quickQ2': 'How do I book a demo class?',
      'chat.quickQ3': 'Do you provide placement support?',
      'chat.quickQ4': 'Where can I find study notes?',
      'chat.fallback.course': 'You can check available programs from the Courses menu in the header. If you want, I can also suggest a beginner-friendly learning path.',
      'chat.fallback.demo': 'To book a demo seat, use the “Book Demo Seat” button in Upcoming Batches. Our team will contact you shortly.',
      'chat.fallback.placement': 'At Quenrix, placement-focused training, mock interviews, and project guidance are included. You can also explore recent outcomes in Success Stories.',
      'chat.fallback.notes': 'In the Study Notes tab, you can access subject-wise materials. You can also use search to quickly find topics.',
      'chat.fallback.default': 'Thanks! 🙌 I am ready to help—would you like guidance on courses, demo classes, notes, or placements?',

      // Navbar
      'nav.tab.batch': 'Upcoming Batches',
      'nav.tab.notes': 'Study Notes',
      'nav.tab.success': 'Success Stories',
      'nav.loadingBatches': 'Loading active batches...',
      'nav.noActiveBatches': 'No Active Batches',
      'nav.noActiveBatchesDesc': 'Please check back later for new course announcements.',
      'nav.enrollingNow': 'Enrolling Now',
      'nav.startDate': 'Start Date',
      'nav.comingSoon': 'Coming Soon',
      'nav.time': 'Time',
      'nav.mode': 'Mode',
      'nav.bookDemo': 'Book Demo Seat →',
      'nav.studyMaterial': 'Study Material',
      'nav.selectSubject': 'Select subject to load notes.',
      'nav.searchTopics': 'Search topics...',
      'nav.fetchingNotes': 'Fetching notes...',
      'nav.noNotesForSubject': 'No notes found for {{subject}}.',
      'nav.preview': 'Preview 👁️',
      'nav.wallOfFame': 'Our Wall of Fame',
      'nav.wallOfFameSub': 'Inspiring stories from our alumni.',
      'nav.loadingStories': 'Loading success stories...',
      'nav.bookDemoTitle': 'Book Your Demo Seat',
      'nav.bookDemoDesc': 'Fill out the form below to reserve your spot for {{course}}.',
      'nav.fullName': 'Full Name',
      'nav.enterFullName': 'Enter your full name',
      'nav.nameRequired': 'Name is required.',
      'nav.phone': 'Phone Number',
      'nav.enterPhone': 'Enter mobile number',
      'nav.phoneRequired': 'Valid phone number is required.',
      'nav.emailOptional': 'Email (Optional)',
      'nav.enterEmail': 'example@email.com',
      'nav.emailInvalid': 'Please enter a valid email.',
      'nav.selectedCourse': 'Selected Course',
      'nav.bookingSeat': 'Booking Seat...',
      'nav.confirmBooking': 'Confirm Booking',
      'nav.seatBooked': 'Seat Booked Successfully!',
      'nav.seatBookedDesc': 'Thank you for your interest. Our team will contact you shortly to confirm your demo schedule.',
      'nav.close': 'Close',
      'nav.package': 'Package: {{package}}',
      'nav.previewLoadFailed': 'Could not load preview.',
      'nav.submitFailed': 'Something went wrong. Please try again later.',
  'nav.batchDesc': 'Join the active batch "{{batch}}". Comprehensive curriculum with {{mode}} sessions.',
  'nav.tagPlacement': 'Placement Assist',
  'nav.defaultCourse': 'Advanced Course',
  'nav.defaultMode': 'Online',
  'nav.defaultTime': 'Flexible',

      // Footer
      'footer.statement1': 'Your Tech Journey Begins Here.',
      'footer.statement2': 'Ready to Transform? 🔥',
      'footer.subtitle': 'Learn with industry mentors, build real projects, and launch your career faster with Quenrix.',
      'footer.exploreCourses': 'Explore Courses',
      'footer.talkAdvisor': 'Talk to Advisor',
      'footer.tagline': 'Empowering the next generation of digital leaders through world-class training and mentorship.',
      'footer.quickLinks': 'Quick Links',
      'footer.company': 'Company',
      'footer.resources': 'Resources',
      'footer.courses': 'Courses',
      'footer.successStories': 'Success Stories',
      'footer.privacy': 'Privacy Policy',
      'footer.aboutUs': 'About Us',
      'footer.careers': 'Careers',
      'footer.hiring': 'Hiring',
      'footer.blog': 'Blog',
      'footer.contact': 'Contact',
      'footer.freeNotes': 'Free Notes',
      'footer.copyright': '© 2026 Quenrix. All Rights Reserved. Crafted with passion.',
      'footer.chatbotName': 'QUENRIX Assistant',
      'footer.chatOnline': 'Online',

      // About modal
      'about.preTitle': 'OUR LEGACY, YOUR FUTURE',
      'about.title1': 'Redefining Tech Education',
      'about.title2': 'for the Digital Age.',
      'about.desc': 'Quenrix is more than an institute; it’s a launchpad for world-class careers. We combine intensive, hands-on training with cutting-edge professional development to transform aspiring learners into industry-ready leaders.',
      'about.years': 'Years of Excellence',
      'about.trained': 'Trained Professionals',
      'about.certs': 'Global Certifications',
      'about.philosophy': 'Our Philosophy: Learn, Build, Succeed',
      'about.syllabusTitle': 'Industry Aligned Syllabus',
      'about.syllabusDesc': 'We update our curriculum every six months based on inputs from FAANG engineers, ensuring you learn only the most relevant, in-demand technologies.',
      'about.collabTitle': 'Global Collaborations',
      'about.collabDesc': 'Quenrix actively partners with international tech organizations to provide real-world training environments and internship opportunities for our students.',
      'about.projectsTitle': 'Hands-on Project Focus',
      'about.projectsDesc': 'Every course culminates in large-scale capstone projects, giving you a portfolio that proves your capabilities to potential employers.',
      'about.ethos': 'Brand Ethos',
      'about.ethosTitle': 'Learning that feels structured, modern, and human.',
      'about.ethosDesc': 'We design every learning touchpoint with premium clarity — from roadmaps and projects to mock interviews and mentor check-ins.',
      'about.velocity': 'Career Velocity',
      'about.velocityTitle': 'From beginner confidence to interview readiness.',
      'about.velocityDesc': 'Our framework blends deep fundamentals, guided projects, and placement strategy to keep your momentum high every week.',
      'about.aiKicker': 'AI Powered Experience',
      'about.aiTitle': 'Future-Ready Learning with AI',
      'about.aiSub': 'From adaptive study plans to real-time interview feedback, Quenrix blends human mentorship with intelligent learning tools.',
      'about.aiMapTitle': 'Smart Skill Mapping',
      'about.aiMapDesc': 'Our AI maps your strengths and gaps, then builds a personalized weekly roadmap to speed up mastery.',
      'about.aiInterviewTitle': 'AI Interview Simulator',
      'about.aiInterviewDesc': 'Practice role-based interviews with instant feedback on communication, logic, and confidence.',
      'about.aiProgressTitle': 'Progress Intelligence',
      'about.aiProgressDesc': 'Track deep insights on consistency, topic retention, and job-readiness through visual performance dashboards.',
      'about.mentors': 'Meet Our Mentors',
      'about.mentorsSub': 'Learn directly from senior professionals who have built systems at top MNCs.',
      'about.experience': 'Exp: {{value}}',
      'about.signature': 'Committed to Excellence.'
    },
    hi: {
      // Header
      'header.courses': 'कोर्सेस',
      'header.careers': 'करियर्स',
      'header.blog': 'ब्लॉग',
      'header.contact': 'कॉन्टैक्ट',
      'header.login': 'लॉग इन',
      'header.menu': 'मेनू',
      'header.back': 'वापस',
      'header.allCourses': 'सभी कोर्सेस',
      'header.loading': 'लोड हो रहा है...',
      'header.loadingCourses': 'कोर्सेस लोड हो रहे हैं...',
      'header.enrollNow': 'अभी एनरोल करें',
      'header.startJourneyIn': '{{course}} में अपनी यात्रा शुरू करें',
      'header.note': 'नोट:',
      'header.enrollNote': 'अगर आपको कोर्स के बारे में और जानकारी चाहिए, तो यह फॉर्म भरें। हमारी एक्सपर्ट टीम आपको कॉल करेगी।',
      'header.fullName': 'पूरा नाम',
      'header.emailAddress': 'ईमेल एड्रेस',
      'header.phoneNumber': 'फोन नंबर',
      'header.requestCallback': 'कॉलबैक रिक्वेस्ट करें',
      'header.submitting': 'सबमिट हो रहा है...',
      'header.language': 'भाषा',
      'header.english': 'अंग्रेज़ी',
      'header.hindi': 'हिंदी',

      // Hero
      'hero.kicker': 'Quenrix करियर एक्सेलेरेशन प्लेटफ़ॉर्म',
      'hero.titleStart': 'स्किल्स बनाएं।',
      'hero.titleHighlight': 'हायर',
      'hero.titleEnd': 'हों। अपना टेक करियर शुरू करें।',
      'hero.subtitle': 'इंटरैक्टिव कोर्सेस से इन-डिमांड प्रोग्रामिंग स्किल्स सीखें और गारंटीड प्लेसमेंट सपोर्ट के साथ अपनी ड्रीम जॉब पाएं। हज़ारों सफल डेवलपर्स की तरह अपना करियर बदलें।',
      'hero.aboutBtn': 'Quenrix के बारे में',
      'hero.rating': '4.8/5 सीखने वालों की रेटिंग',
      'hero.learners': '10,000+ एक्टिव लर्नर्स',
      'hero.livePreview': 'लाइव प्रीव्यू',
      'hero.output': 'आउटपुट:',

      // Demo classes
      'demo.title': 'हमारी फ्री डेमो क्लासेस देखें',
      'demo.subtitle': 'एनरोल करने से पहले वर्ल्ड-क्लास टीचिंग का अनुभव लें।',
      'demo.instructor': 'इंस्ट्रक्टर',
      'demo.readMore': 'और पढ़ें',
      'demo.showLess': 'कम दिखाएं',

      // Chatbot
      'chat.inputPlaceholder': 'अपना सवाल लिखें...',
      'chat.send': 'भेजें',
      'chat.welcome': 'नमस्ते! 👋 मैं Quenrix असिस्टेंट हूँ। आप मुझसे कोर्स, डेमो क्लास, प्लेसमेंट या स्टडी नोट्स के बारे में पूछ सकते हैं।',
      'chat.quickQ1': 'शुरुआत के लिए सबसे अच्छा कोर्स कौन सा है?',
      'chat.quickQ2': 'डेमो क्लास कैसे बुक करूँ?',
      'chat.quickQ3': 'क्या प्लेसमेंट सपोर्ट मिलता है?',
      'chat.quickQ4': 'स्टडी नोट्स कहाँ मिलेंगे?',
      'chat.fallback.course': 'आप हेडर के Courses मेनू में उपलब्ध प्रोग्राम देख सकते हैं। चाहें तो मैं आपके लिए beginner-friendly learning path भी suggest कर सकता हूँ।',
      'chat.fallback.demo': 'डेमो सीट बुक करने के लिए Upcoming Batches में “Book Demo Seat” बटन उपयोग करें। हमारी टीम जल्दी आपसे संपर्क करेगी।',
      'chat.fallback.placement': 'Quenrix में placement-focused training, mock interviews और project guidance शामिल है। आप Success Stories में recent results भी देख सकते हैं।',
      'chat.fallback.notes': 'Study Notes टैब में subject-wise materials उपलब्ध हैं। आप topics जल्दी ढूँढने के लिए search भी कर सकते हैं।',
      'chat.fallback.default': 'धन्यवाद! 🙌 मैं मदद के लिए तैयार हूँ—आपको courses, demo class, notes या placements में किस पर guidance चाहिए?',

      // Navbar
      'nav.tab.batch': 'आने वाले बैचेस',
      'nav.tab.notes': 'स्टडी नोट्स',
      'nav.tab.success': 'सक्सेस स्टोरीज़',
      'nav.loadingBatches': 'एक्टिव बैचेस लोड हो रहे हैं...',
      'nav.noActiveBatches': 'कोई एक्टिव बैच नहीं',
      'nav.noActiveBatchesDesc': 'नए कोर्स अपडेट के लिए बाद में फिर देखें।',
      'nav.enrollingNow': 'एडमिशन चालू है',
      'nav.startDate': 'शुरू होने की तारीख',
      'nav.comingSoon': 'जल्द आ रहा है',
      'nav.time': 'समय',
      'nav.mode': 'मोड',
      'nav.bookDemo': 'डेमो सीट बुक करें →',
      'nav.studyMaterial': 'स्टडी मटेरियल',
      'nav.selectSubject': 'नोट्स लोड करने के लिए विषय चुनें।',
      'nav.searchTopics': 'टॉपिक्स खोजें...',
      'nav.fetchingNotes': 'नोट्स लाए जा रहे हैं...',
      'nav.noNotesForSubject': '{{subject}} के लिए कोई नोट्स नहीं मिले।',
      'nav.preview': 'प्रीव्यू 👁️',
      'nav.wallOfFame': 'हमारा वॉल ऑफ फेम',
      'nav.wallOfFameSub': 'हमारे एलुमनाई की प्रेरणादायक कहानियाँ।',
      'nav.loadingStories': 'सक्सेस स्टोरीज़ लोड हो रही हैं...',
      'nav.bookDemoTitle': 'अपनी डेमो सीट बुक करें',
      'nav.bookDemoDesc': '{{course}} के लिए अपनी सीट रिज़र्व करने हेतु नीचे फॉर्म भरें।',
      'nav.fullName': 'पूरा नाम',
      'nav.enterFullName': 'अपना पूरा नाम दर्ज करें',
      'nav.nameRequired': 'नाम आवश्यक है।',
      'nav.phone': 'फोन नंबर',
      'nav.enterPhone': 'मोबाइल नंबर दर्ज करें',
      'nav.phoneRequired': 'मान्य फोन नंबर आवश्यक है।',
      'nav.emailOptional': 'ईमेल (वैकल्पिक)',
      'nav.enterEmail': 'example@email.com',
      'nav.emailInvalid': 'कृपया मान्य ईमेल दर्ज करें।',
      'nav.selectedCourse': 'चुना गया कोर्स',
      'nav.bookingSeat': 'सीट बुक हो रही है...',
      'nav.confirmBooking': 'बुकिंग कन्फर्म करें',
      'nav.seatBooked': 'सीट सफलतापूर्वक बुक हुई!',
      'nav.seatBookedDesc': 'रुचि दिखाने के लिए धन्यवाद। हमारी टीम आपके डेमो शेड्यूल की पुष्टि के लिए जल्द संपर्क करेगी।',
      'nav.close': 'बंद करें',
      'nav.package': 'पैकेज: {{package}}',
      'nav.previewLoadFailed': 'प्रीव्यू लोड नहीं हो सका।',
      'nav.submitFailed': 'कुछ गलत हुआ। कृपया बाद में पुनः प्रयास करें।',
  'nav.batchDesc': 'एक्टिव बैच "{{batch}}" जॉइन करें। {{mode}} सेशन्स के साथ व्यापक पाठ्यक्रम उपलब्ध है।',
  'nav.tagPlacement': 'प्लेसमेंट सहायता',
  'nav.defaultCourse': 'एडवांस कोर्स',
  'nav.defaultMode': 'ऑनलाइन',
  'nav.defaultTime': 'लचीला समय',

      // Footer
      'footer.statement1': 'आपकी टेक जर्नी यहीं से शुरू होती है।',
      'footer.statement2': 'ट्रांसफॉर्म होने के लिए तैयार? 🔥',
      'footer.subtitle': 'इंडस्ट्री मेंटर्स के साथ सीखें, रियल प्रोजेक्ट्स बनाएं और Quenrix के साथ अपना करियर तेज़ी से आगे बढ़ाएं।',
      'footer.exploreCourses': 'कोर्सेस देखें',
      'footer.talkAdvisor': 'एडवाइज़र से बात करें',
      'footer.tagline': 'विश्वस्तरीय ट्रेनिंग और मेंटरशिप के माध्यम से डिजिटल लीडर्स की नई पीढ़ी को सशक्त बनाना।',
      'footer.quickLinks': 'क्विक लिंक्स',
      'footer.company': 'कंपनी',
      'footer.resources': 'संसाधन',
      'footer.courses': 'कोर्सेस',
      'footer.successStories': 'सक्सेस स्टोरीज़',
      'footer.privacy': 'प्राइवेसी पॉलिसी',
      'footer.aboutUs': 'हमारे बारे में',
      'footer.careers': 'करियर्स',
      'footer.hiring': 'हायरिंग',
      'footer.blog': 'ब्लॉग',
      'footer.contact': 'कॉन्टैक्ट',
      'footer.freeNotes': 'फ्री नोट्स',
      'footer.copyright': '© 2026 Quenrix. सर्वाधिकार सुरक्षित। जुनून के साथ तैयार किया गया।',
      'footer.chatbotName': 'QUENRIX असिस्टेंट',
      'footer.chatOnline': 'ऑनलाइन',

      // About modal
      'about.preTitle': 'हमारी विरासत, आपका भविष्य',
      'about.title1': 'डिजिटल युग के लिए',
      'about.title2': 'टेक एजुकेशन को नए रूप में।',
      'about.desc': 'Quenrix सिर्फ एक संस्थान नहीं, बल्कि विश्वस्तरीय करियर का लॉन्चपैड है। हम हैंड्स-ऑन ट्रेनिंग और आधुनिक प्रोफेशनल डेवलपमेंट को मिलाकर सीखने वालों को इंडस्ट्री-रेडी बनाते हैं।',
      'about.years': 'उत्कृष्टता के वर्ष',
      'about.trained': 'प्रशिक्षित प्रोफेशनल्स',
      'about.certs': 'ग्लोबल सर्टिफिकेशन्स',
      'about.philosophy': 'हमारा दर्शन: सीखो, बनाओ, सफल होओ',
      'about.syllabusTitle': 'इंडस्ट्री-अलाइन सिलेबस',
      'about.syllabusDesc': 'हम हर छह महीने में FAANG इंजीनियर्स के इनपुट के आधार पर पाठ्यक्रम अपडेट करते हैं, ताकि आप सिर्फ सबसे प्रासंगिक तकनीक सीखें।',
      'about.collabTitle': 'ग्लोबल कोलैबोरेशन',
      'about.collabDesc': 'Quenrix अंतरराष्ट्रीय टेक संगठनों के साथ साझेदारी करके रियल-वर्ल्ड ट्रेनिंग और इंटर्नशिप अवसर देता है।',
      'about.projectsTitle': 'हैंड्स-ऑन प्रोजेक्ट फोकस',
      'about.projectsDesc': 'हर कोर्स बड़े कैपस्टोन प्रोजेक्ट्स के साथ खत्म होता है, जिससे आपकी स्किल्स का मजबूत पोर्टफोलियो बनता है।',
      'about.ethos': 'ब्रांड एथोस',
      'about.ethosTitle': 'सीखना जो structured, modern और human लगे।',
      'about.ethosDesc': 'हम हर learning touchpoint को premium clarity के साथ design करते हैं—roadmaps, projects, mock interviews और mentor check-ins तक।',
      'about.velocity': 'करियर प्रगति',
      'about.velocityTitle': 'शुरुआती confidence से interview readiness तक।',
      'about.velocityDesc': 'हमारा framework fundamentals, guided projects और placement strategy को मिलाकर आपकी growth speed high रखता है।',
      'about.aiKicker': 'AI पावर्ड अनुभव',
      'about.aiTitle': 'AI के साथ भविष्य-तैयार सीखना',
      'about.aiSub': 'Adaptive study plans से real-time interview feedback तक, Quenrix human mentorship को intelligent learning tools के साथ जोड़ता है।',
      'about.aiMapTitle': 'स्मार्ट स्किल मैपिंग',
      'about.aiMapDesc': 'हमारा AI आपकी strengths और gaps को map करके personalized weekly roadmap बनाता है।',
      'about.aiInterviewTitle': 'AI इंटरव्यू सिम्युलेटर',
      'about.aiInterviewDesc': 'Role-based interviews का practice करें और communication, logic, confidence पर instant feedback पाएँ।',
      'about.aiProgressTitle': 'प्रोग्रेस इंटेलिजेंस',
      'about.aiProgressDesc': 'Consistency, retention और job-readiness की deep insights visual dashboards में ट्रैक करें।',
      'about.mentors': 'हमारे मेंटर्स से मिलें',
      'about.mentorsSub': 'टॉप MNCs में systems बनाने वाले senior professionals से सीधे सीखें।',
      'about.experience': 'अनुभव: {{value}}',
      'about.signature': 'उत्कृष्टता के लिए प्रतिबद्ध।'
    }
  };

  get currentLanguage(): LanguageCode {
    return this.languageSubject.value;
  }

  setLanguage(language: LanguageCode): void {
    if (language === this.languageSubject.value) {
      return;
    }

    this.languageSubject.next(language);
    localStorage.setItem(this.storageKey, language);
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLanguage === 'en' ? 'hi' : 'en');
  }

  t(key: string, params?: TranslationParams): string {
    const dictionary = this.translations[this.currentLanguage];
    const fallbackDictionary = this.translations.en;

    const template = dictionary[key] ?? fallbackDictionary[key] ?? key;

    if (!params) {
      return template;
    }

    return template.replace(/{{\s*(\w+)\s*}}/g, (_, token: string) => {
      const value = params[token];
      return value !== undefined ? String(value) : '';
    });
  }

  private readInitialLanguage(): LanguageCode {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'hi' ? 'hi' : 'en';
  }
}
