import React, { useState, useMemo } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetMascot,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Search,
  Heart,
  Clock,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  CheckCircle2,
  Filter,
  X,
  Mic,
  BookOpen,
  Volume2,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { SPEAK_VELVET_TOPICS, TopicItem, TopicQuestion } from '../data/topicsData.ts';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface PracticeTopicItem {
  id: string;
  title: string;
  category: 'School' | 'Social' | 'Everyday Life' | 'Entertainment' | 'Activities' | 'Travel';
  sub: string;
  description: string;
  emoji: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  questionCount: number;
  skillsPracticed: string[];
  practiceStatus?: {
    completedCount: number;
    lastPracticedText: string;
    lastDuration?: string;
  };
  recommendationReason?: string;
  openingQuestion: {
    en: string;
    ta: string;
  };
  sentenceStarters: {
    en: string;
    ta: string;
  }[];
}

// Complete library of practice topics for Speak Velvet
export const EXTENDED_PRACTICE_TOPICS: PracticeTopicItem[] = [
  {
    id: 'school',
    title: 'School Life',
    category: 'School',
    sub: 'Favorite subjects, teachers, and classroom fun',
    description: 'Talk about your classes, favorite teachers, fun classroom experiments, and lunch break moments with classmates.',
    emoji: '🏫',
    level: 'Beginner',
    duration: '4-5 mins',
    questionCount: 5,
    skillsPracticed: ['Fluency', 'School Vocabulary', 'Connecting Words'],
    practiceStatus: {
      completedCount: 3,
      lastPracticedText: 'Yesterday',
      lastDuration: '5.5 min',
    },
    recommendationReason: 'Because you enjoy School discussions',
    openingQuestion: {
      en: 'What is your favorite subject at school, and why?',
      ta: 'பள்ளியில் உங்களுக்குப் பிடித்த பாடம் எது, ஏன்?',
    },
    sentenceStarters: [
      { en: 'My favorite subject is...', ta: 'எனக்கு பிடித்த பாடம்...' },
      { en: 'I really enjoy it because...', ta: 'எனக்கு இது மிகவும் பிடிக்கும் ஏனென்றால்...' },
      { en: 'One thing I learned recently is...', ta: 'சமீபத்தில் நான் கற்றுக்கொண்ட ஒரு விஷயம்...' },
    ],
  },
  {
    id: 'friends',
    title: 'Friends & Fun',
    category: 'Social',
    sub: 'Playground chats, sharing lunches, and weekend fun',
    description: 'Share stories about your best friends, playground games during recess, and how you solve disagreements.',
    emoji: '👥',
    level: 'Beginner',
    duration: '4 mins',
    questionCount: 5,
    skillsPracticed: ['Storytelling', 'Descriptive Words', 'Empathy'],
    practiceStatus: {
      completedCount: 2,
      lastPracticedText: '3 days ago',
      lastDuration: '3.8 min',
    },
    recommendationReason: 'Because you like chatting about classmates & playground fun',
    openingQuestion: {
      en: 'What do you usually do when you hang out with your friends?',
      ta: 'நண்பர்களுடன் இருக்கும்போது பொதுவாக நீங்கள் என்ன செய்வீர்கள்?',
    },
    sentenceStarters: [
      { en: 'We usually play...', ta: 'நாங்கள் வழக்கமாக விளையாடுவது...' },
      { en: 'My best friend and I like to...', ta: 'நானும் என் சிறந்த நண்பனும் விரும்பவது...' },
      { en: 'A great friend is someone who...', ta: 'ஒரு நல்ல நண்பன் என்பவர்...' },
    ],
  },
  {
    id: 'sports',
    title: 'Sports & Games',
    category: 'Activities',
    sub: 'Cricket, football, athletic events, and team spirit',
    description: 'Discuss cricket batting, school sports day victories, energetic playground matches, and fitness habits.',
    emoji: '⚽',
    level: 'Intermediate',
    duration: '5 mins',
    questionCount: 5,
    skillsPracticed: ['Consonant Endings', 'Action Verbs', 'Sentence Flow'],
    practiceStatus: {
      completedCount: 2,
      lastPracticedText: '2 days ago',
      lastDuration: '4.2 min',
    },
    recommendationReason: 'Because you enjoy Sports & athletic activities',
    openingQuestion: {
      en: 'What sport do you enjoy playing or watching the most?',
      ta: 'எந்த விளையாட்டை விளையாட அல்லது பார்க்க விரும்புகிறீர்கள்?',
    },
    sentenceStarters: [
      { en: 'I love playing...', ta: 'எனக்கு விளையாட மிகவும் பிடிக்கும்...' },
      { en: 'My favorite player is... because...', ta: 'எனக்கு பிடித்த வீரர்... ஏனென்றால்...' },
      { en: 'During our school sports day, I...', ta: 'எங்கள் பள்ளி விளையாட்டு விழாவின் போது, நான்...' },
    ],
  },
  {
    id: 'food',
    title: 'Food & Cooking',
    category: 'Everyday Life',
    sub: 'Favorite snacks, home-cooked meals, and festival treats',
    description: 'Describe crunchy snacks in your tiffin box, Sunday lunches, cooking with family, and festival sweets.',
    emoji: '🍔',
    level: 'Beginner',
    duration: '4 mins',
    questionCount: 5,
    skillsPracticed: ['Sensory Adjectives', 'Sequencing Steps', 'Food Vocabulary'],
    practiceStatus: {
      completedCount: 1,
      lastPracticedText: 'Last week',
      lastDuration: '3.5 min',
    },
    openingQuestion: {
      en: 'What is your favorite food, and when do you usually eat it?',
      ta: 'உங்களுக்குப் பிடித்த உணவு எது, அதை எப்போது சாப்பிடுவீர்கள்?',
    },
    sentenceStarters: [
      { en: 'My favorite food is hot...', ta: 'எனக்கு பிடித்த உணவு சூடான...' },
      { en: 'In my school tiffin box, I love...', ta: 'என் பள்ளி டிபன் பாக்ஸில் எனக்கு பிடிப்பது...' },
      { en: 'During festivals, my family prepares...', ta: 'பண்டிகைகளின் போது என் குடும்பம் தயாரிப்பது...' },
    ],
  },
  {
    id: 'movies',
    title: 'Movies & Cinema',
    category: 'Entertainment',
    sub: 'Superheroes, animated films, and theater adventures',
    description: 'Talk about favorite heroes, superpowers you wish you had, memorable theater outings, and movie music.',
    emoji: '🎬',
    level: 'Intermediate',
    duration: '5 mins',
    questionCount: 5,
    skillsPracticed: ['Expressing Opinions', 'Vocal Cadence', 'Imagination'],
    openingQuestion: {
      en: 'What kind of movie is your favorite, and who is your favorite hero?',
      ta: 'எந்த வகையான திரைப்படம் உங்களுக்கு பிடிக்கும், உங்களுக்கு பிடித்த நாயகன் யார்?',
    },
    sentenceStarters: [
      { en: 'I really love watching...', ta: 'எனக்கு பார்க்க மிகவும் பிடிக்கும்...' },
      { en: 'If I could have any superpower, I would...', ta: 'எனக்கு ஏதேனும் சக்தி கிடைத்தால், நான்...' },
      { en: 'The most exciting scene was when...', ta: 'மிகவும் உற்சாகமான காட்சி என்னவென்றால்...' },
    ],
  },
  {
    id: 'games',
    title: 'Video & Board Games',
    category: 'Entertainment',
    sub: 'Chess, puzzles, mobile games, and teamwork',
    description: 'Share your favorite strategy games, chess moves, weekend gaming with cousins, and puzzle challenges.',
    emoji: '🎮',
    level: 'Intermediate',
    duration: '4-5 mins',
    questionCount: 5,
    skillsPracticed: ['Explanation Logic', 'Rules & Sequence', 'Vocabulary'],
    openingQuestion: {
      en: 'What game do you like playing the most with friends or family?',
      ta: 'நண்பர்கள் அல்லது குடும்பத்தினருடன் எந்த விளையாட்டை விளையாட விரும்புகிறீர்கள்?',
    },
    sentenceStarters: [
      { en: 'The game I enjoy most is...', ta: 'எனக்கு மிகவும் பிடித்த விளையாட்டு...' },
      { en: 'The main goal of this game is to...', ta: 'இந்த விளையாட்டின் முக்கிய குறிக்கோள்...' },
      { en: 'A good strategy to win is...', ta: 'வெற்றி பெற ஒரு நல்ல உத்தி...' },
    ],
  },
  {
    id: 'family',
    title: 'Family & Home',
    category: 'Everyday Life',
    sub: 'Evening dinners, grandparents stories, and helping at home',
    description: 'Talk about bedtime stories from grandparents, helping parents with household chores, and family holidays.',
    emoji: '🏡',
    level: 'Beginner',
    duration: '4 mins',
    questionCount: 5,
    skillsPracticed: ['Personal Pronouns', 'Past Tense', 'Warm Intonation'],
    practiceStatus: {
      completedCount: 1,
      lastPracticedText: '5 days ago',
      lastDuration: '4.0 min',
    },
    openingQuestion: {
      en: 'Who in your family tells the most interesting stories?',
      ta: 'உங்கள் குடும்பத்தில் மிகவும் சுவாரஸ்யமான கதைகளை யார் சொல்வார்கள்?',
    },
    sentenceStarters: [
      { en: 'My grandfather always tells stories about...', ta: 'என் தாத்தா எப்போதும் கதைகள் சொல்வார்...' },
      { en: 'At home, my favorite routine is...', ta: 'வீட்டில் எனக்கு மிகவும் பிடித்த வழக்கம்...' },
      { en: 'I help my family by...', ta: 'நான் என் குடும்பத்திற்கு உதவுவது...' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Journeys',
    category: 'Travel',
    sub: 'Train trips, hill stations, village visits, and packing bags',
    description: 'Describe window seats on express trains, hill station trips to Ooty or Kodaikanal, and temple visits.',
    emoji: '✈️',
    level: 'Advanced',
    duration: '5-6 mins',
    questionCount: 5,
    skillsPracticed: ['Complex Sentences', 'Sensory Details', 'Travel Vocabulary'],
    openingQuestion: {
      en: 'If you could take a trip anywhere, where would you like to travel?',
      ta: 'நீங்கள் எங்கு வேண்டுமானாலும் பயணம் செய்ய முடிந்தால், எங்கு செல்வீர்கள்?',
    },
    sentenceStarters: [
      { en: 'I would love to travel to...', ta: 'நான் பயணம் செய்ய விரும்புவது...' },
      { en: 'I prefer traveling by train because...', ta: 'ரயில் பயணம் பிடிக்கும் ஏனென்றால்...' },
      { en: 'The most beautiful view I ever saw was...', ta: 'நான் பார்த்த மிக அழகான காட்சி...' },
    ],
  },
  {
    id: 'hobbies',
    title: 'Creative Arts & Hobbies',
    category: 'Activities',
    sub: 'Drawing, craft making, music, and stamp collecting',
    description: 'Discuss your creative passions, favorite drawings, learning an instrument, and how hobbies help you relax.',
    emoji: '🎨',
    level: 'Intermediate',
    duration: '4-5 mins',
    questionCount: 5,
    skillsPracticed: ['Creative Expression', 'Descriptive Nuance', 'Confidence'],
    openingQuestion: {
      en: 'What creative hobby makes you feel happiest in your free time?',
      ta: 'ஓய்வு நேரத்தில் எந்த ஆக்கப்பூர்வமான பொழுதுபோக்கு உங்களுக்கு மகிழ்ச்சி தருகிறது?',
    },
    sentenceStarters: [
      { en: 'In my free time, I really like to create...', ta: 'ஓய்வு நேரத்தில், நான் உருவாக்க விரும்புவது...' },
      { en: 'Working on my hobby helps me feel...', ta: 'என் பொழுதுபோக்கில் ஈடுபடுவது எனக்கு தரும் உணர்வு...' },
      { en: 'Recently, I painted a picture of...', ta: 'சமீபத்தில் நான் வரைந்த படம்...' },
    ],
  },
  {
    id: 'events',
    title: 'School Events & Annual Day',
    category: 'School',
    sub: 'Stage performances, science fairs, and celebrations',
    description: 'Share memories of school Independence Day parades, annual day skits, science exhibitions, and speech contests.',
    emoji: '🎭',
    level: 'Intermediate',
    duration: '5 mins',
    questionCount: 5,
    skillsPracticed: ['Public Speaking Vocabulary', 'Event Chronology', 'Vocal Cadence'],
    openingQuestion: {
      en: 'What is your favorite school event or annual celebration each year?',
      ta: 'ஒவ்வொரு ஆண்டும் உங்களுக்குப் பிடித்த பள்ளி நிகழ்வு எது?',
    },
    sentenceStarters: [
      { en: 'The most exciting school event is...', ta: 'மிகவும் உற்சாகமான பள்ளி நிகழ்வு...' },
      { en: 'During our last annual day, I participated in...', ta: 'எங்கள் முந்தைய ஆண்டு விழாவில் நான் பங்கேற்றது...' },
      { en: 'The whole school was decorated with...', ta: 'பள்ளி முழுவதும் அலங்கரிக்கப்பட்டது...' },
    ],
  },
  {
    id: 'weekend',
    title: 'Weekend Plans & Adventures',
    category: 'Social',
    sub: 'Saturday morning cycles, park visits, and Sunday feasts',
    description: 'Talk about weekend routines, cycling with neighborhood friends, family outings, and getting ready for Monday.',
    emoji: '🚴',
    level: 'Beginner',
    duration: '4 mins',
    questionCount: 5,
    skillsPracticed: ['Time Words', 'Future Intentions', 'Casual Dialogue'],
    openingQuestion: {
      en: 'How do you like to spend a relaxing Sunday morning?',
      ta: 'ஒரு நிதானமான ஞாயிறு காலையை நீங்கள் எவ்வாறு கழிக்க விரும்புகிறீர்கள்?',
    },
    sentenceStarters: [
      { en: 'On Sunday mornings, I usually wake up and...', ta: 'ஞாயிறு காலைகளில் நான் விழித்து...' },
      { en: 'My favorite weekend activity with friends is...', ta: 'நண்பர்களுடன் எனக்கு பிடித்த வார இறுதி செயல்பாடு...' },
      { en: 'Before Monday starts, I make sure to...', ta: 'திங்கட்கிழமை தொடங்கும் முன் நான்...' },
    ],
  },
  {
    id: 'tech',
    title: 'Technology & Inventions',
    category: 'Everyday Life',
    sub: 'Robots, solar energy, smartphones, and future dreams',
    description: 'Explore exciting inventions, how computers help your school projects, space exploration, and futuristic gadgets.',
    emoji: '🤖',
    level: 'Advanced',
    duration: '5-6 mins',
    questionCount: 5,
    skillsPracticed: ['Technical Terms', 'Hypothetical Reasoning', 'Articulation'],
    openingQuestion: {
      en: 'What modern gadget or invention do you find most fascinating?',
      ta: 'எந்த நவீன சாதனம் அல்லது கண்டுபிடிப்பு உங்களுக்கு மிகவும் கவர்ச்சிகரமானதாக உள்ளது?',
    },
    sentenceStarters: [
      { en: 'I am really fascinated by how computers can...', ta: 'கணினிகளால் எப்படி முடியும் என்பதை பார்க்கும்போது...' },
      { en: 'If I could invent something for my school, it would be...', ta: 'என் பள்ளிக்கு எதையாவது கண்டுபிடிக்க முடிந்தால், அது...' },
      { en: 'Technology makes studying easier because...', ta: 'தொழில்நுட்பம் படிப்பதை எளிதாக்குகிறது ஏனென்றால்...' },
    ],
  },
];

export interface TopicsLibraryScreenProps {
  languageMode?: LanguageMode;
  onSelectTopic: (topicId: string) => void;
  studentLevel?: string;
  studentStreak?: number;
  dailyGoalProgress?: string;
}

export const TopicsLibraryScreen: React.FC<TopicsLibraryScreenProps> = ({
  languageMode = 'en',
  onSelectTopic,
  studentLevel = 'Level 4 · Confident Speaker',
  studentStreak = 7,
  dailyGoalProgress = '3.5 / 5 min',
}) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [favoriteTopicIds, setFavoriteTopicIds] = useState<string[]>(['school', 'sports', 'friends']);
  const [selectedTopicForDetail, setSelectedTopicForDetail] = useState<PracticeTopicItem | null>(null);

  // Categories list
  const categories = [
    'All',
    'School',
    'Social',
    'Everyday Life',
    'Entertainment',
    'Activities',
    'Travel',
  ] as const;

  // Toggle favorite helper
  const handleToggleFavorite = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  // 3 Recommended topics for student
  const recommendedTopics = useMemo(() => {
    return EXTENDED_PRACTICE_TOPICS.filter((t) => t.recommendationReason).slice(0, 3);
  }, []);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return EXTENDED_PRACTICE_TOPICS.filter((topic) => {
      // Category filter
      if (selectedCategory !== 'All' && topic.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && topic.level !== selectedDifficulty) {
        return false;
      }
      // Favorites filter
      if (showOnlyFavorites && !favoriteTopicIds.includes(topic.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = topic.title.toLowerCase().includes(query);
        const matchesSub = topic.sub.toLowerCase().includes(query);
        const matchesDesc = topic.description.toLowerCase().includes(query);
        const matchesCategory = topic.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSub && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, showOnlyFavorites, favoriteTopicIds, searchQuery]);

  // Bilingual strings
  const t = {
    heading: languageMode === 'en_ta' ? 'பயிற்சி தலைப்புகள்' : 'Practice Topics',
    sub:
      languageMode === 'en_ta'
        ? 'உங்களுக்கு பிடித்த தலைப்பை தேர்வு செய்து Velvet உடன் உரையாடலைத் தொடங்குங்கள்.'
        : 'Choose something you enjoy and start a conversation with Velvet.',
    velvetReady:
      languageMode === 'en_ta'
        ? 'உங்களுக்கு பிடித்த தலைப்பை தேர்வு செய்யுங்கள். நான் தயாராக இருக்கிறேன்!'
        : "Pick a topic you enjoy. I'm ready to listen and chat!",
    recHeading: languageMode === 'en_ta' ? 'உங்களுக்கான பரிந்துரைகள்' : 'Recommended for You',
    recSub:
      languageMode === 'en_ta'
        ? 'உங்கள் ஆர்வங்கள் மற்றும் முந்தைய பயிற்சியின் அடிப்படையில் பரிந்துரைக்கப்படுபவை.'
        : 'Based on your selected interests from Profile & everyday school conversations.',
    filterAll: languageMode === 'en_ta' ? 'அனைத்தும்' : 'All',
    searchPlaceholder: languageMode === 'en_ta' ? 'தலைப்புகளைத் தேடுங்கள்...' : 'Search topics by name, school scenario...',
    favFilterBtn: languageMode === 'en_ta' ? 'விருப்பமானவை' : 'My Favorites',
    noFavsTitle: languageMode === 'en_ta' ? 'விருப்பமான தலைப்புகள் ஏதுமில்லை' : 'Your favorite topics will appear here.',
    noFavsSub:
      languageMode === 'en_ta'
        ? 'நீங்கள் விரும்பும் தலைப்புகள் இங்கே தோன்றும். ஏதேனும் தலைப்பின் இதயக் குறியீட்டை அழுத்தவும்.'
        : 'Click the heart icon on any topic card to save it here for quick everyday practice.',
    exploreAllBtn: languageMode === 'en_ta' ? 'அனைத்து தலைப்புகளையும் காண்க' : 'Explore All Topics',
    noSearchResults: languageMode === 'en_ta' ? 'தலைப்புகள் எதுவும் கிடைக்கவில்லை' : 'No topics match your search.',
    recentSectionHeading: languageMode === 'en_ta' ? 'சமீபத்தில் பயிற்சி செய்தவை' : 'Recently Practiced',
    startPracticeCTA: languageMode === 'en_ta' ? 'பயிற்சி தொடங்குக' : 'Start Practice',
    practiceAgainCTA: languageMode === 'en_ta' ? 'மீண்டும் பேசுக' : 'Practice Again',
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. TOPICS LIBRARY HEADER WITH COMPACT STATS              */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          
          {/* Header Copy & Velvet Introduction */}
          <div className="space-y-3 text-center md:text-left max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>12 Everyday School Scenarios</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight">
              {t.heading}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {t.sub}
            </p>

            {/* Velvet Encouragement Bubble */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#BFDBFE] shadow-2xs text-xs text-[#1E40AF] font-medium flex items-center gap-2.5 inline-flex text-left">
              <VelvetSparkleStar size={14} color="blue" />
              <span className="font-bold text-[#0F172A]">
                "{t.velvetReady}"
              </span>
            </div>
          </div>

          {/* Right: Mascot & Student's Compact Daily Status */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-32 h-32 rounded-full bg-[#DBEAFE]/70 blur-xl -z-1" />
              <VelvetMascot state="happy" size="md" animated={true} />
            </div>

            {/* Compact Student Stats Pill Box */}
            <div className="p-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-[11px]">{studentLevel.split('·')[0]}</span>
              </div>
              <span className="text-[#CBD5E1]">·</span>
              <div className="flex items-center gap-1.5 font-bold text-[#D97706]">
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-[11px]">{studentStreak}d Streak</span>
              </div>
              <span className="text-[#CBD5E1]">·</span>
              <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px]">{dailyGoalProgress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Dedicated Topics Library Visual Slot (< 640px) */}
        <div className="sm:hidden w-full pt-4">
          <MobileVisualSlot
            src={SPEAK_VELVET_ASSETS.topics.libraryHero.src}
            alt={SPEAK_VELVET_ASSETS.topics.libraryHero.alt}
            aspectRatio="16:9"
            fitMode="cover"
            rounded="2xl"
            fallbackMascotState="thinking"
            fallbackTitle="Explore Practice Topics"
            fallbackSubtitle="School, friends, hobbies, science & everyday conversations"
            className="shadow-2xs"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. RECOMMENDED FOR YOU (PERSONALIZED 3 TOPICS)           */}
      {/* ======================================================== */}
      {!showOnlyFavorites && !searchQuery.trim() && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                  {t.recHeading}
                </h2>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {t.recSub}
              </p>
            </div>

            <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE] self-start sm:self-auto">
              Curated for Class 8A
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedTopics.map((topic) => (
              <div
                key={`rec-${topic.id}`}
                onClick={() => setSelectedTopicForDetail(topic)}
                className="p-5 rounded-3xl bg-white border border-[#BFDBFE] hover:border-[#2563EB] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative group"
              >
                {/* Header Icon + Favorite Button */}
                <div className="flex items-start justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                    {topic.emoji}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      {topic.duration}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(topic.id, e)}
                      aria-label={`Favorite ${topic.title}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        favoriteTopicIds.includes(topic.id)
                          ? 'text-[#E11D48] bg-[#FFF1F2]'
                          : 'text-[#94A3B8] hover:text-[#E11D48] hover:bg-[#F8FAFD]'
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={favoriteTopicIds.includes(topic.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                      {topic.category}
                    </span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="text-[10px] font-bold text-[#64748B]">
                      {topic.level}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {topic.sub}
                  </p>
                </div>

                {/* Recommendation Reason Pill */}
                <div className="p-2 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#92400E] font-medium flex items-center gap-1.5">
                  <VelvetSparkleStar size={12} color="gold" />
                  <span className="truncate">{topic.recommendationReason}</span>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopic(topic.id);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Practice with Velvet</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 3. SEARCH & DUAL FILTER CONTROLS                         */}
      {/* ======================================================== */}
      <section className="space-y-4">
        
        {/* Search Field + My Favorites Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none text-xs font-medium text-[#0F172A] shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right: Favorites & Difficulty Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Favorites Filter Button */}
            <button
              type="button"
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs border ${
                showOnlyFavorites
                  ? 'bg-[#FFF1F2] border-[#FECDD3] text-[#E11D48]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" fill={showOnlyFavorites ? 'currentColor' : 'none'} />
              <span>{t.favFilterBtn}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                showOnlyFavorites ? 'bg-white text-[#E11D48]' : 'bg-[#F1F5F9] text-[#64748B]'
              }`}>
                {favoriteTopicIds.length}
              </span>
            </button>

            {/* Difficulty Selector Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="px-3 py-2.5 rounded-2xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#334155] focus:outline-none focus:border-[#2563EB] shadow-2xs cursor-pointer"
              aria-label="Filter by difficulty"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? EXTENDED_PRACTICE_TOPICS.length
                : EXTENDED_PRACTICE_TOPICS.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. TOPICS COLLECTION GRID & EMPTY STATES                 */}
      {/* ======================================================== */}
      <section className="space-y-4">
        
        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
          <span>
            Showing <strong>{filteredTopics.length}</strong> {filteredTopics.length === 1 ? 'topic' : 'topics'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedDifficulty !== 'All' && ` · ${selectedDifficulty}`}
            {showOnlyFavorites && ` · Favorites`}
          </span>

          {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || showOnlyFavorites || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setShowOnlyFavorites(false);
                setSearchQuery('');
              }}
              className="text-[#2563EB] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Empty State: No Favorites */}
        {showOnlyFavorites && filteredTopics.length === 0 && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] text-center space-y-4 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center mx-auto text-3xl">
              ❤️
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                {t.noFavsTitle}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {t.noFavsSub}
              </p>
            </div>
            <VelvetButton
              variant="outline"
              size="sm"
              onClick={() => setShowOnlyFavorites(false)}
            >
              {t.exploreAllBtn}
            </VelvetButton>
          </div>
        )}

        {/* Empty State: Search / Filter No Results */}
        {!showOnlyFavorites && filteredTopics.length === 0 && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] text-center space-y-4 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#F8FAFD] text-[#64748B] flex items-center justify-center mx-auto text-3xl">
              🔍
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                {t.noSearchResults}
              </h3>
              <p className="text-xs text-[#64748B]">
                Try adjusting your search terms or selecting 'All' categories.
              </p>
            </div>
            <VelvetButton
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
            >
              Clear Search & Filters
            </VelvetButton>
          </div>
        )}

        {/* Grid of Topic Cards (1 col mobile, 2 col tablet, 3 col desktop) */}
        {filteredTopics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => {
              const isFav = favoriteTopicIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicForDetail(topic)}
                  className="p-5 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  {/* Top Bar: Icon + Difficulty + Favorite */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                      {topic.emoji}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                        {topic.duration}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          topic.level === 'Beginner'
                            ? 'bg-[#ECFDF5] text-[#059669]'
                            : topic.level === 'Intermediate'
                            ? 'bg-[#EFF6FF] text-[#2563EB]'
                            : 'bg-[#FEF3C7] text-[#B45309]'
                        }`}
                      >
                        {topic.level}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(topic.id, e)}
                        aria-label={`Favorite ${topic.title}`}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ml-0.5 ${
                          isFav
                            ? 'text-[#E11D48] bg-[#FFF1F2]'
                            : 'text-[#94A3B8] hover:text-[#E11D48] hover:bg-[#F8FAFD]'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block">
                      {topic.category}
                    </span>

                    <h3 className="font-display font-bold text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                      {topic.sub}
                    </p>
                  </div>

                  {/* Practice Status or Skills */}
                  {topic.practiceStatus ? (
                    <div className="p-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] text-[#065F46] font-medium flex items-center justify-between">
                      <span className="flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                        <span>{topic.practiceStatus.completedCount} completed</span>
                      </span>
                      <span className="text-[#047857] text-[10px]">
                        Last: {topic.practiceStatus.lastPracticedText}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-[#64748B]">
                      <HelpCircle className="w-3 h-3 text-[#94A3B8]" />
                      <span>{topic.questionCount} speaking prompts</span>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#64748B] group-hover:text-[#2563EB] flex items-center gap-1">
                      <span>View details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTopic(topic.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Mic className="w-3 h-3" />
                      <span>{t.startPracticeCTA}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 5. RECENTLY PRACTICED STRIP                              */}
      {/* ======================================================== */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2563EB]" />
          <h2 className="font-display font-bold text-lg text-[#0F172A]">
            {t.recentSectionHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'school', title: 'School Life', time: 'Yesterday', duration: '5.5 min', emoji: '🏫' },
            { id: 'sports', title: 'Sports & Games', time: '2 days ago', duration: '4.2 min', emoji: '⚽' },
            { id: 'friends', title: 'Friends & Fun', time: '3 days ago', duration: '3.8 min', emoji: '👥' },
          ].map((item) => (
            <div
              key={`recent-${item.id}`}
              className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex items-center justify-between gap-3 hover:border-[#BFDBFE] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <span className="font-bold text-xs text-[#0F172A] block">{item.title}</span>
                  <span className="text-[10px] text-[#64748B]">
                    {item.time} · {item.duration}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectTopic(item.id)}
                className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-[11px] font-bold transition-colors cursor-pointer"
              >
                {t.practiceAgainCTA}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TOPIC DETAIL MODAL                                    */}
      {/* ======================================================== */}
      {selectedTopicForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => setSelectedTopicForDetail(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-3xl shrink-0 shadow-2xs">
                {selectedTopicForDetail.emoji}
              </div>

              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] px-2 py-0.5 rounded-full bg-[#EFF6FF]">
                    {selectedTopicForDetail.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#059669] px-2 py-0.5 rounded-full bg-[#ECFDF5]">
                    {selectedTopicForDetail.level}
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B]">
                    ~{selectedTopicForDetail.duration}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                  {selectedTopicForDetail.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {selectedTopicForDetail.description}
                </p>
              </div>
            </div>

            {/* Core Skills Practiced Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Core Skills Practiced:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTopicForDetail.skillsPracticed.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-[#334155]"
                  >
                    ✨ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Opening Question (Bilingual Scaffolding) */}
            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] block">
                Sample Opening Question with Velvet:
              </span>
              <p className="font-bold text-sm text-[#0F172A]">
                "{selectedTopicForDetail.openingQuestion.en}"
              </p>
              {languageMode === 'en_ta' && (
                <p className="text-xs text-[#64748B]">
                  "{selectedTopicForDetail.openingQuestion.ta}"
                </p>
              )}
            </div>

            {/* Example Sentence Starters */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Helpful Sentence Starters:
              </span>
              <div className="space-y-1.5 text-xs">
                {selectedTopicForDetail.sentenceStarters.map((starter, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex flex-col gap-0.5"
                  >
                    <span className="font-medium text-[#0F172A]">
                      • {starter.en}
                    </span>
                    {languageMode === 'en_ta' && (
                      <span className="text-[11px] text-[#64748B] pl-2">
                        {starter.ta}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <VelvetButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  const id = selectedTopicForDetail.id;
                  setSelectedTopicForDetail(null);
                  onSelectTopic(id);
                }}
                className="flex items-center justify-center gap-2"
              >
                <Mic className="w-4 h-4" />
                <span>Start Practice with Velvet</span>
              </VelvetButton>

              <VelvetButton
                variant="outline"
                size="md"
                onClick={() => setSelectedTopicForDetail(null)}
              >
                Close
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
