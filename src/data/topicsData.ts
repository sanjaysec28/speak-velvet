export interface TopicQuestion {
  id: string;
  en: string;
  ta: string;
  starters: { en: string; ta: string }[];
  coachTip: string;
}

export interface TopicItem {
  id: string;
  title: string;
  sub: string;
  emoji: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tint: 'white' | 'sky' | 'mint' | 'amber' | 'rose' | 'lavender';
  questions: TopicQuestion[];
}

export const SPEAK_VELVET_TOPICS: TopicItem[] = [
  {
    id: 'school',
    title: 'School',
    sub: 'Favorite subjects, teachers, and classroom fun',
    emoji: '🏫',
    level: 'Beginner',
    duration: '~2 mins',
    tint: 'white',
    questions: [
      {
        id: 'school-1',
        en: "What is your favorite subject at school, and why?",
        ta: "பள்ளியில் உங்களுக்குப் பிடித்த பாடம் எது, ஏன்?",
        starters: [
          {
            en: "My favorite subject is science because we do experiments.",
            ta: "எனக்கு பிடித்த பாடம் அறிவியல், ஏனென்றால் நாங்கள் சோதனைகள் செய்கிறோம்.",
          },
          {
            en: "I really enjoy English because I like reading interesting stories.",
            ta: "கதைகள் வாசிப்பது பிடிக்கும் என்பதால் எனக்கு ஆங்கிலம் மிகவும் பிடிக்கும்.",
          },
          {
            en: "I love mathematics because solving problems is fun.",
            ta: "கணக்குகளுக்கு விடை காண்பது பிடிக்கும் என்பதால் கணிதம் பிடிக்கும்.",
          },
        ],
        coachTip: "Use the word 'because' to connect your favorite subject with your reason.",
      },
      {
        id: 'school-2',
        en: "Who is your favorite teacher and what do they teach?",
        ta: "உங்களுக்குப் பிடித்த ஆசிரியர் யார், அவர்கள் என்ன பாடம் கற்பிக்கிறார்கள்?",
        starters: [
          {
            en: "Mrs. Radhika is my favorite teacher because she teaches English kindly.",
            ta: "ராதிகா ஆசிரியை எனக்கு மிகவும் பிடிக்கும், அவர் அன்பாக கற்பிக்கிறார்.",
          },
          {
            en: "Our science teacher makes every lesson easy and practical.",
            ta: "எங்கள் அறிவியல் ஆசிரியர் பாடங்களை எளிமையாகவும் செய்முறை விளக்கத்துடனும் நடத்துகிறார்.",
          },
        ],
        coachTip: "Describe what makes their teaching special or memorable.",
      },
      {
        id: 'school-3',
        en: "What do you usually do during lunch break with your classmates?",
        ta: "மதிய உணவு இடைவேளையில் நண்பர்களுடன் என்ன செய்வீர்கள்?",
        starters: [
          {
            en: "We share our lunch tiffin and talk about our weekend plans.",
            ta: "நாங்கள் மதிய உணவை பகிர்ந்து கொண்டு வார இறுதி திட்டங்களைப் பற்றி பேசுவோம்.",
          },
          {
            en: "We quickly finish lunch and play a short game in the corridor.",
            ta: "நாங்கள் வேகமாக சாப்பிட்டுவிட்டு சிறிய விளையாட்டு விளையாடுவோம்.",
          },
        ],
        coachTip: "Mention the friends you sit with and the snacks you enjoyed.",
      },
      {
        id: 'school-4',
        en: "Tell me about a memorable project or science fair you had in school.",
        ta: "பள்ளியில் நடந்த மறக்க முடியாத அறிவியல் கண்காட்சி பற்றி சொல்லுங்கள்.",
        starters: [
          {
            en: "I built a model of a volcano with baking soda and vinegar.",
            ta: "நான் சோடா உப்பு மற்றும் வினிகர் கொண்டு எரிமலை மாதிரி செய்தேன்.",
          },
          {
            en: "Our team created a solar-powered water fountain.",
            ta: "எங்கள் குழு சூரிய ஒளியில் இயங்கும் நீர் நீரூற்றை உருவாக்கியது.",
          },
        ],
        coachTip: "Use action verbs in the past tense like 'built', 'created', or 'demonstrated'.",
      },
      {
        id: 'school-5',
        en: "What is one new thing you learned in school this week?",
        ta: "இந்த வாரம் பள்ளியில் நீங்கள் கற்றுக்கொண்ட ஒரு புதிய விஷயம் என்ன?",
        starters: [
          {
            en: "I learned how plants make their food using sunlight.",
            ta: "தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவு தயாரிப்பதை கற்றுக்கொண்டேன்.",
          },
          {
            en: "We practiced three new English idioms in class.",
            ta: "நாங்கள் வகுப்பில் மூன்று புதிய ஆங்கில பழமொழிகளைப் பயிற்சி செய்தோம்.",
          },
        ],
        coachTip: "Start with 'This week in class, I discovered that...'",
      },
    ],
  },
  {
    id: 'friends',
    title: 'Friends',
    sub: 'Playground chats, sharing lunches, and weekend fun',
    emoji: '👥',
    level: 'Beginner',
    duration: '~2 mins',
    tint: 'sky',
    questions: [
      {
        id: 'friends-1',
        en: "What do you usually do when you hang out with your friends?",
        ta: "நண்பர்களுடன் இருக்கும்போது பொதுவாக நீங்கள் என்ன செய்வீர்கள்?",
        starters: [
          {
            en: "We usually play cricket or tag in the playground.",
            ta: "நாங்கள் வழக்கமாக விளையாட்டு மைதானத்தில் கிரிக்கெட் விளையாடுவோம்.",
          },
          {
            en: "We share snacks and discuss our favorite movies and cartoons.",
            ta: "நாங்கள் தின்பண்டங்களை பகிர்ந்துகொண்டு திரைப்படங்களை பற்றி பேசுவோம்.",
          },
          {
            en: "We help each other with homework and draw pictures together.",
            ta: "நாங்கள் வீட்டுப்பாடம் செய்ய ஒருவருக்கொருவர் உதவுவோம்.",
          },
        ],
        coachTip: "Mention the games you play or the funny stories you share.",
      },
      {
        id: 'friends-2',
        en: "Tell me about your best friend at school.",
        ta: "பள்ளியில் உங்களுக்குப் பிடித்த நண்பரைப் பற்றி சொல்லுங்கள்.",
        starters: [
          {
            en: "My best friend is Karthik; he is very helpful and funny.",
            ta: "என் சிறந்த நண்பன் கார்த்திக்; அவன் மிகவும் உதவிகரமானவன் மற்றும் நகைச்சுவையானவன்.",
          },
          {
            en: "We have been classmates since first standard and sit together.",
            ta: "நாங்கள் முதல் வகுப்பில் இருந்தே ஒன்றாகப் படிக்கிறோம்.",
          },
        ],
        coachTip: "Use adjectives like 'caring', 'creative', 'cheerful', or 'supportive'.",
      },
      {
        id: 'friends-3',
        en: "What makes someone a great friend in your opinion?",
        ta: "உங்கள் கருத்துப்படி யார் ஒரு நல்ல நண்பர்?",
        starters: [
          {
            en: "A great friend is someone who listens and helps when you are in trouble.",
            ta: "ஒரு நல்ல நண்பன் கஷ்டத்தில் இருக்கும்போது உதவுபவன் மற்றும் கவனிப்பவன்.",
          },
          {
            en: "Someone who shares their toys and never leaves you alone.",
            ta: "தன்னிடம் உள்ளதை பகிர்ந்துகொண்டு எப்போதும் துணையாக இருப்பவன்.",
          },
        ],
        coachTip: "Express qualities like trust, honesty, and loyalty.",
      },
      {
        id: 'friends-4',
        en: "Have you and your friends ever planned something exciting together?",
        ta: "நீங்களும் உங்கள் நண்பர்களும் இணைந்து எப்போதாவது திட்டமிட்டதுண்டா?",
        starters: [
          {
            en: "Yes, we organized a weekend cricket tournament in our street.",
            ta: "ஆம், நாங்கள் எங்கள் தெருவில் வார இறுதி கிரிக்கெட் போட்டி நடத்தினோம்.",
          },
          {
            en: "We surprised our classmate with a handmade birthday card.",
            ta: "எங்கள் வகுப்புத் தோழருக்கு கையால் செய்த பிறந்தநாள் வாழ்த்து அட்டை கொடுத்து ஆச்சரியப்படுத்தினோம்.",
          },
        ],
        coachTip: "Explain what happened and how everyone felt.",
      },
      {
        id: 'friends-5',
        en: "How do you solve a disagreement with your friend?",
        ta: "நண்பருடன் கருத்து வேறுபாடு வந்தால் அதை எப்படி சரிசெய்வீர்கள்?",
        starters: [
          {
            en: "We talk calmly and say sorry to each other quickly.",
            ta: "நாங்கள் அமைதியாகப் பேசி உடனே ஒருவருக்கொருவர் மன்னிப்பு கேட்டுக்கொள்வோம்.",
          },
          {
            en: "We take a short break and shake hands before going home.",
            ta: "நாங்கள் சிறிது நேரம் கழித்து கைகுலுக்கி மீண்டும் நண்பர்களாவோம்.",
          },
        ],
        coachTip: "Show maturity by mentioning apologies and listening.",
      },
    ],
  },
  {
    id: 'sports',
    title: 'Sports',
    sub: 'Cricket, football, athletic events, and team spirit',
    emoji: '⚽',
    level: 'Intermediate',
    duration: '~3 mins',
    tint: 'mint',
    questions: [
      {
        id: 'sports-1',
        en: "What sport do you enjoy playing or watching?",
        ta: "எந்த விளையாட்டை விளையாட அல்லது பார்க்க விரும்புகிறீர்கள்?",
        starters: [
          {
            en: "I love playing cricket, especially batting with a tennis ball.",
            ta: "எனக்கு கிரிக்கெட் விளையாடுவது மிகவும் பிடிக்கும், குறிப்பாக பேட்டிங் செய்வது.",
          },
          {
            en: "I enjoy playing football as a defender with my school team.",
            ta: "பள்ளி அணியில் கால்பந்து விளையாடுவது எனக்கு பிடிக்கும்.",
          },
          {
            en: "I like badminton because it keeps me fast and energetic.",
            ta: "பேட்மிண்டன் சுறுசுறுப்பாக இருக்க உதவுவதால் எனக்கு பிடிக்கும்.",
          },
        ],
        coachTip: "Mention whether you are a batsman, bowler, defender, or runner!",
      },
      {
        id: 'sports-2',
        en: "Who is your favorite sports player or role model?",
        ta: "உங்களுக்குப் பிடித்த விளையாட்டு வீரர் அல்லது வழிகாட்டி யார்?",
        starters: [
          {
            en: "My favorite player is MS Dhoni because of his calm captaincy.",
            ta: "தோனியின் அமைதியான தலைமைப் பண்பு எனக்கு மிகவும் பிடிக்கும்.",
          },
          {
            en: "I admire Virat Kohli for his incredible fitness and dedication.",
            ta: "விராட் கோலியின் உடற்தகுதியும் அர்ப்பணிப்பும் எனக்கு உத்வேகம் தருகிறது.",
          },
        ],
        coachTip: "Give one specific reason why this player inspires you.",
      },
      {
        id: 'sports-3',
        en: "How did your school's annual sports day go this year?",
        ta: "இந்த ஆண்டு உங்கள் பள்ளியின் விளையாட்டு விழா எப்படி நடந்தது?",
        starters: [
          {
            en: "It was exciting! Our house won the relay race trophy.",
            ta: "மிகவும் உற்சாகமாக இருந்தது! எங்கள் அணி ரிலே ஓட்டப்பந்தயத்தில் வென்றது.",
          },
          {
            en: "I participated in the 100-meter dash and cheered for my friends.",
            ta: "நான் 100 மீட்டர் ஓட்டப்பந்தயத்தில் கலந்துகொண்டு நண்பர்களை உற்சாகப்படுத்தினேன்.",
          },
        ],
        coachTip: "Mention the cheering, house colors, and the trophies won.",
      },
      {
        id: 'sports-4',
        en: "Do you prefer individual sports or team games?",
        ta: "தனிநபர் விளையாட்டுகள் பிடிக்குமா அல்லது குழு விளையாட்டுகளா?",
        starters: [
          {
            en: "I prefer team games because celebrating victory together is more fun.",
            ta: "குழு விளையாட்டுகள் பிடிக்கும், ஏனெனில் வெற்றியை ஒன்றாகக் கொண்டாடுவது சிறப்பு.",
          },
          {
            en: "I like individual sports like chess because I can focus alone.",
            ta: "செஸ் போன்ற தனிநபர் விளையாட்டுகள் பிடிக்கும், ஏனென்றால் தனியாக கவனம் செலுத்த முடியும்.",
          },
        ],
        coachTip: "Compare the two using 'prefer... because...'",
      },
      {
        id: 'sports-5',
        en: "Why is daily physical exercise important for students?",
        ta: "மாணவர்களுக்கு தினசரி உடற்பயிற்சி ஏன் முக்கியம்?",
        starters: [
          {
            en: "It keeps our body healthy and helps our mind stay alert for studies.",
            ta: "இது உடலை ஆரோக்கியமாக வைத்து படிக்க மனதை சுறுசுறுப்பாக்குகிறது.",
          },
          {
            en: "Playing sports relieves stress after a long school day.",
            ta: "பள்ளி நேரத்திற்குப் பின் விளையாடுவது மன அழுத்தத்தை குறைக்கிறது.",
          },
        ],
        coachTip: "Use words like 'stamina', 'focus', and 'health'.",
      },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    sub: 'Favorite snacks, home-cooked meals, and street food',
    emoji: '🍔',
    level: 'Beginner',
    duration: '~2 mins',
    tint: 'amber',
    questions: [
      {
        id: 'food-1',
        en: "What is your favorite food, and when do you usually eat it?",
        ta: "உங்களுக்குப் பிடித்த உணவு எது, அதை எப்போது சாப்பிடுவீர்கள்?",
        starters: [
          {
            en: "My favorite food is hot dosa with coconut chutney for breakfast.",
            ta: "எனக்கு பிடித்த உணவு தேங்காய் சட்னியுடன் கூடிய சூடான தோசை.",
          },
          {
            en: "I love homemade chicken biryani on Sunday afternoons.",
            ta: "ஞாயிற்றுக்கிழமைகளில் வீட்டில் செய்யும் பிரியாணி எனக்கு மிகவும் பிடிக்கும்.",
          },
          {
            en: "I really like curd rice with mango pickle after school.",
            ta: "பள்ளி முடிந்து வந்ததும் மாங்காய் ஊறுகாயுடன் தயிர் சாதம் பிடிக்கும்.",
          },
        ],
        coachTip: "Use sensory words like 'crispy', 'spicy', 'steaming', or 'delicious'.",
      },
      {
        id: 'food-2',
        en: "What snack do you like to bring in your school tiffin box?",
        ta: "பள்ளிக்கு எடுத்துச் செல்ல உங்களுக்குப் பிடித்த சிற்றுண்டி எது?",
        starters: [
          {
            en: "I love vegetable sandwiches with crunchy cucumbers.",
            ta: "வெள்ளரிக்காய் வைத்த காய்கறி சாண்ட்விச் எனக்கு மிகவும் பிடிக்கும்.",
          },
          {
            en: "My mother packs roasted groundnuts and banana chips.",
            ta: "என் அம்மா வறுத்த நிலக்கடலையும் வாழைக்காய் சிப்ஸும் தருவார்கள்.",
          },
        ],
        coachTip: "Mention how your mother or father prepares it for you.",
      },
      {
        id: 'food-3',
        en: "Have you ever tried helping your parents cook in the kitchen?",
        ta: "சமையலறையில் பெற்றோருக்கு சமைக்க எப்போதாவது உதவியுள்ளீர்களா?",
        starters: [
          {
            en: "Yes, I help wash vegetables and set the dining plates.",
            ta: "ஆம், நான் காய்கறிகளை கழுவி சாப்பாட்டு தட்டுகளை எடுத்து வைப்பேன்.",
          },
          {
            en: "I once helped roll out round chapatis with my mother.",
            ta: "ஒருமுறை என் அம்மாவுடன் சேர்ந்து சப்பாத்தி திரட்ட உதவினேன்.",
          },
        ],
        coachTip: "Mention the safety rules like staying away from the stove.",
      },
      {
        id: 'food-4',
        en: "Do you prefer sweet desserts or spicy savory snacks?",
        ta: "இனிப்பு பலகாரங்கள் பிடிக்குமா அல்லது காரமான சிற்றுண்டிகளா?",
        starters: [
          {
            en: "I have a sweet tooth, so warm gulab jamun is my top pick.",
            ta: "எனக்கு இனிப்புகள் மிகவும் பிடிக்கும், குறிப்பாக குலாப் ஜாமுன்.",
          },
          {
            en: "I prefer spicy snacks like samosas and masala vadai.",
            ta: "எனக்கு காரசாரமான சமோசா மற்றும் மசால் வடை பிடிக்கும்.",
          },
        ],
        coachTip: "Explain why your taste buds prefer that flavor.",
      },
      {
        id: 'food-5',
        en: "What special dish does your family prepare during festivals like Pongal or Diwali?",
        ta: "பொங்கல் அல்லது தீபாவளி போன்ற பண்டிகைகளில் உங்கள் வீட்டில் என்ன செய்வார்கள்?",
        starters: [
          {
            en: "We make sweet Pongal with jaggery, ghee, and roasted cashews.",
            ta: "நாங்கள் வெல்லம், நெய் மற்றும் முந்திரியுடன் சர்க்கரைப் பொங்கல் செய்வோம்.",
          },
          {
            en: "My grandmother prepares delicious murukku and laddu.",
            ta: "என் பாட்டி சுவையான முறுக்கும் லட்டும் செய்வார்கள்.",
          },
        ],
        coachTip: "Describe the aroma and the tradition behind the festival food.",
      },
    ],
  },
  {
    id: 'movies',
    title: 'Movies',
    sub: 'Favorite films, cinema heroes, cartoons, and stories',
    emoji: '🎬',
    level: 'Intermediate',
    duration: '~3 mins',
    tint: 'rose',
    questions: [
      {
        id: 'movies-1',
        en: "What kind of movie is your favorite to watch, and who is your favorite character?",
        ta: "எந்த வகையான திரைப்படத்தை பார்க்க விரும்புகிறீர்கள், அதில் உங்களுக்குப் பிடித்த கதாபாத்திரம் யார்?",
        starters: [
          {
            en: "I love superhero action movies like Spider-Man and Avengers.",
            ta: "எனக்கு ஸ்பைடர் மேன் போன்ற அதிரடி திரைப்படங்கள் மிகவும் பிடிக்கும்.",
          },
          {
            en: "I enjoy animated movies like Lion King and Kung Fu Panda.",
            ta: "அனிமேஷன் திரைப்படங்களை விரும்பி பார்ப்பேன்.",
          },
          {
            en: "I like comedy films that make the whole family laugh together.",
            ta: "குடும்பத்தோடு சேர்ந்து சிரிக்கும் நகைச்சுவை படங்கள் எனக்கு பிடிக்கும்.",
          },
        ],
        coachTip: "Describe the character's superpower or personality trait.",
      },
      {
        id: 'movies-2',
        en: "What was the last movie you watched in a theater or on TV?",
        ta: "திரையரங்கில் அல்லது டிவியில் கடைசியாகப் பார்த்த திரைப்படம் எது?",
        starters: [
          {
            en: "I watched an adventure movie with my family last weekend.",
            ta: "கடந்த வார இறுதியில் குடும்பத்துடன் ஒரு சாகச படம் பார்த்தேன்.",
          },
          {
            en: "We watched an exciting science fiction movie about space exploration.",
            ta: "விண்வெளி ஆராய்ச்சி பற்றிய ஒரு அருமையான அறிவியல் படம் பார்த்தோம்.",
          },
        ],
        coachTip: "Mention the popcorn, the big screen, or who went with you.",
      },
      {
        id: 'movies-3',
        en: "If you could have any superpower from a movie, which one would you choose?",
        ta: "திரைப்படத்தில் வரும் ஏதேனும் ஒரு சக்தி உங்களுக்குக் கிடைத்தால் எதைத் தேர்ந்தெடுப்பீர்கள்?",
        starters: [
          {
            en: "I would choose the power to fly so I could travel anywhere instantly.",
            ta: "பறக்கும் சக்தி வேண்டும், அப்போதுதான் எங்கு வேண்டுமானாலும் உடனே செல்ல முடியும்.",
          },
          {
            en: "I would choose invisibility to explore mysterious places secretly.",
            ta: "மறைந்து போகும் சக்தியைத் தேர்ந்தெடுப்பேன்.",
          },
        ],
        coachTip: "Use the conditional phrase 'If I had that power, I would...'",
      },
      {
        id: 'movies-4',
        en: "Do you enjoy the songs and background music in movies?",
        ta: "திரைப்படங்களில் வரும் பாடல்களும் பின்னணி இசையும் உங்களுக்கு பிடிக்குமா?",
        starters: [
          {
            en: "Yes, upbeat fast songs make me want to dance!",
            ta: "ஆம், உற்சாகமான பாடல்கள் என்னை ஆடத் தூண்டுகின்றன!",
          },
          {
            en: "I love dramatic orchestral music during hero entry scenes.",
            ta: "நாயகன் வரும் காட்சிகளில் வரும் பின்னணி இசை எனக்கு மிகவும் பிடிக்கும்.",
          },
        ],
        coachTip: "Talk about how the music changes the mood of the scene.",
      },
      {
        id: 'movies-5',
        en: "Would you like to act in a school play or movie someday?",
        ta: "எதிர்காலத்தில் பள்ளி நாடகத்திலோ அல்லது படத்திலோ நடிக்க ஆசையா?",
        starters: [
          {
            en: "Yes, I would love to play a brave king or an adventurous detective.",
            ta: "ஆம், ஒரு துணிச்சலான அரசன் அல்லது துப்பறிவாளனாக நடிக்க ஆசை.",
          },
          {
            en: "I feel a bit nervous on stage, but I would like to try backstage work.",
            ta: "மேடையில் பேச கூச்சம் உண்டு, ஆனால் திரைக்குப் பின்னால் உதவ பிடிக்கும்.",
          },
        ],
        coachTip: "Be honest about your feelings towards public stage performance.",
      },
    ],
  },
  {
    id: 'games',
    title: 'Games',
    sub: 'Board games, chess, mobile quizzes, and video games',
    emoji: '🎮',
    level: 'Intermediate',
    duration: '~3 mins',
    tint: 'lavender',
    questions: [
      {
        id: 'games-1',
        en: "Do you like playing outdoor games or mobile/computer games more, and why?",
        ta: "வெளியில் விளையாடும் விளையாட்டுகளா அல்லது வீடியோ விளையாட்டுகளா, எது உங்களுக்கு அதிகம் பிடிக்கும்?",
        starters: [
          {
            en: "I prefer outdoor games because running around gives me energy.",
            ta: "வெளியில் ஓடி விளையாடுவது உற்சாகம் தருவதால் எனக்கு பிடிக்கும்.",
          },
          {
            en: "I like puzzle and strategy games like chess and Minecraft.",
            ta: "செஸ் மற்றும் உத்தி சார்ந்த விளையாட்டுகள் எனக்கு பிடிக்கும்.",
          },
          {
            en: "I enjoy car racing games on the tablet during weekend breaks.",
            ta: "வார இறுதி நாட்களில் கார் பந்தய விளையாட்டுகளை விளையாடுவேன்.",
          },
        ],
        coachTip: "Balance the benefits of both active play and mental puzzles.",
      },
      {
        id: 'games-2',
        en: "What board game do you enjoy playing with your family or friends?",
        ta: "குடும்பத்தினருடன் அல்லது நண்பர்களுடன் விளையாட உங்களுக்குப் பிடித்த பலகை விளையாட்டு எது?",
        starters: [
          {
            en: "I love playing Carrom; potting the red queen is so exciting!",
            ta: "கேரம் விளையாடுவது பிடிக்கும்; சிவப்பு ராணியை அடிப்பது மிகவும் சுவாரஸ்யம்!",
          },
          {
            en: "We play Ludo and Snake & Ladders on rainy Sunday afternoons.",
            ta: "மழைக்காலங்களில் லூடோ மற்றும் பரமபதம் விளையாடுவோம்.",
          },
        ],
        coachTip: "Explain a fun rule or who usually wins at home.",
      },
      {
        id: 'games-3',
        en: "How do you feel when you win a tough match in a game?",
        ta: "கடினமான போட்டியில் வெற்றி பெறும்போது உங்கள் உணர்வு எப்படி இருக்கும்?",
        starters: [
          {
            en: "I feel thrilled and proud because my practice paid off.",
            ta: "என் கடின உழைப்புக்கு வெற்றி கிடைத்ததால் பெருமையாக உணர்வேன்.",
          },
          {
            en: "I celebrate happily, but I also give credit to the other player.",
            ta: "மகிழ்ச்சியாகக் கொண்டாடுவேன், அதே நேரம் எதிராளியையும் பாராட்டுவேன்.",
          },
        ],
        coachTip: "Mention sportsmanship and showing respect to opponents.",
      },
      {
        id: 'games-4',
        en: "What rule would you add to make your favorite game even more fun?",
        ta: "உங்களுக்குப் பிடித்த விளையாட்டை மேலும் சுவாரஸ்யமாக்க என்ன புதிய விதியைச் சேர்ப்பீர்கள்?",
        starters: [
          {
            en: "In cricket, I would add double runs for hitting over the fence!",
            ta: "கிரிக்கெட்டில் சுவரைத் தாண்டி அடித்தால் இரட்டை ரன்கள் தருவேன்!",
          },
          {
            en: "In board games, I would add a secret mystery card.",
            ta: "போர்டு கேம்களில் ஒரு ரகசிய அதிர்ஷ்ட அட்டையைச் சேர்ப்பேன்.",
          },
        ],
        coachTip: "Be creative with your imagination.",
      },
      {
        id: 'games-5',
        en: "How do you make sure gaming does not interfere with your studies?",
        ta: "விளையாடுவது படிப்பை பாதிக்காமல் எப்படி பார்த்துக்கொள்கிறீர்கள்?",
        starters: [
          {
            en: "I always finish my school homework before picking up games.",
            ta: "வீட்டுப்பாடத்தை முடித்த பிறகே நான் விளையாடுவேன்.",
          },
          {
            en: "I set a strict 30-minute timer for screen games.",
            ta: "வீடியோ கேம்களுக்கு 30 நிமிடம் மட்டுமே நேரம் ஒதுக்குவேன்.",
          },
        ],
        coachTip: "Highlight self-discipline and time management.",
      },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    sub: 'Parents, siblings, grandparents, and weekend rituals',
    emoji: '👨‍👩‍👧',
    level: 'Beginner',
    duration: '~2 mins',
    tint: 'white',
    questions: [
      {
        id: 'family-1',
        en: "What is something fun you and your family like to do on weekends?",
        ta: "வார இறுதி நாட்களில் நீங்களும் உங்கள் குடும்பமும் இணைந்து என்ன செய்வீர்கள்?",
        starters: [
          {
            en: "We visit the beach in the evening and have roasted corn.",
            ta: "மாலையில் கடற்கரைக்கு சென்று குடும்பத்துடன் நேரம் செலவிடுவோம்.",
          },
          {
            en: "We watch a fun movie together and cook a special dinner.",
            ta: "நாங்கள் ஒன்றாக திரைப்படம் பார்த்து சிறப்பு இரவு உணவு சமைப்போம்.",
          },
          {
            en: "We visit our grandparents and listen to exciting old stories.",
            ta: "தாத்தா பாட்டியைப் பார்த்து அவர்களின் பழைய கதைகளைக் கேட்போம்.",
          },
        ],
        coachTip: "Mention who is in your family and how everyone laughs together.",
      },
      {
        id: 'family-2',
        en: "Who is the funniest or most cheerful person in your family?",
        ta: "உங்கள் குடும்பத்தில் மிகவும் நகைச்சுவையான அல்லது மகிழ்ச்சியான நபர் யார்?",
        starters: [
          {
            en: "My younger brother makes silly faces and makes everyone chuckle.",
            ta: "என் தம்பி வேடிக்கையாக சேட்டைகள் செய்து அனைவரையும் சிரிக்க வைப்பான்.",
          },
          {
            en: "My grandfather tells witty stories from his childhood days.",
            ta: "என் தாத்தா தன் இளமைக்கால நகைச்சுவைக் கதைகளைச் சொல்வார்.",
          },
        ],
        coachTip: "Share a small funny habit they have.",
      },
      {
        id: 'family-3',
        en: "What is your favorite memory of a festival or birthday celebration at home?",
        ta: "வீட்டில் நடந்த பண்டிகை அல்லது பிறந்தநாள் கொண்டாட்டத்தின் மறக்க முடியாத நினைவு எது?",
        starters: [
          {
            en: "During last Diwali, we decorated our whole house with clay lamps.",
            ta: "கடந்த தீபாவளியின் போது எங்கள் வீடு முழுவதும் அகல் விளக்குகளால் அலங்கரித்தோம்.",
          },
          {
            en: "My family surprised me with a homemade chocolate cake.",
            ta: "என் குடும்பத்தினர் எனக்கு வீட்டில் செய்த சாக்லேட் கேக் தந்து ஆச்சரியப்படுத்தினர்.",
          },
        ],
        coachTip: "Use sensory details like bright lights, new clothes, or delicious smells.",
      },
      {
        id: 'family-4',
        en: "How do you help your parents with chores around the house?",
        ta: "வீட்டு வேலைகளில் பெற்றோருக்கு எப்படி உதவுகிறீர்கள்?",
        starters: [
          {
            en: "I keep my study table tidy and fold my school uniform.",
            ta: "என் படிக்கும் மேசையை சுத்தமாக வைத்து சீருடையை மடித்து வைப்பேன்.",
          },
          {
            en: "I water the potted balcony plants every morning.",
            ta: "தினமும் காலையில் பால்கனியில் உள்ள செடிகளுக்கு தண்ணீர் ஊற்றுவேன்.",
          },
        ],
        coachTip: "Demonstrate responsibility and helpfulness.",
      },
      {
        id: 'family-5',
        en: "What is the best piece of advice someone in your family gave you?",
        ta: "உங்கள் குடும்பத்தில் ஒருவர் உங்களுக்குக் கூறிய சிறந்த அறிவுரை என்ன?",
        starters: [
          {
            en: "My father told me to always be honest and never fear making mistakes.",
            ta: "எப்போதும் உண்மையாக இருக்கவும் தவறுகளுக்கு பயப்பட வேண்டாம் என்றும் அப்பா சொன்னார்.",
          },
          {
            en: "My mother taught me that kindness is the greatest superpower.",
            ta: "அன்பே மிகப்பெரிய சக்தி என்பதை என் அம்மா எனக்குக் கற்றுக்கொடுத்தார்.",
          },
        ],
        coachTip: "Quote their words and explain how it helps you in school.",
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    sub: 'Journeys, train trips, hill stations, and dream vacations',
    emoji: '✈️',
    level: 'Advanced',
    duration: '~3 mins',
    tint: 'sky',
    questions: [
      {
        id: 'travel-1',
        en: "If you could take a trip anywhere with your school or family, where would you go?",
        ta: "பள்ளி அல்லது குடும்பத்துடன் எங்கு வேண்டுமானாலும் சுற்றுலா செல்ல முடிந்தால், எங்கு செல்வீர்கள்?",
        starters: [
          {
            en: "I would love to visit Ooty to see the mountains and toy train.",
            ta: "மலைகளையும் பொம்மை ரயிலையும் பார்க்க ஊட்டி செல்ல விரும்புகிறேன்.",
          },
          {
            en: "I want to visit the snowy mountains of Kashmir someday.",
            ta: "காஷ்மீரின் பனி படர்ந்த மலைகளை பார்க்க ஆசைப்படுகிறேன்.",
          },
          {
            en: "I would love to explore the historical temples in Thanjavur.",
            ta: "தஞ்சாவூர் பெரிய கோயிலை நேரில் பார்க்க விரும்புகிறேன்.",
          },
        ],
        coachTip: "Describe the scenery: mountains, beaches, or historical monuments.",
      },
      {
        id: 'travel-2',
        en: "Do you prefer traveling by train, bus, car, or airplane?",
        ta: "ரயில், பேருந்து, கார் அல்லது விமானம், எதில் பயணம் செய்ய விரும்புகிறீர்கள்?",
        starters: [
          {
            en: "I love train journeys because I can watch the countryside through the window.",
            ta: "ஜன்னல் வழியே கிராமப்புற காட்சிகளைப் பார்க்க முடிவதால் ரயில் பயணம் பிடிக்கும்.",
          },
          {
            en: "I like road trips by car so we can stop at roadside tea stalls.",
            ta: "வழியில் தேநீர் கடைகளில் நிற்க முடிவதால் கார் பயணம் பிடிக்கும்.",
          },
        ],
        coachTip: "Mention the window seat and the scenic views.",
      },
      {
        id: 'travel-3',
        en: "Tell me about a memorable place you visited during summer vacation.",
        ta: "கோடை விடுமுறையில் நீங்கள் சென்று பார்த்த மறக்க முடியாத இடத்தைப் பற்றி சொல்லுங்கள்.",
        starters: [
          {
            en: "We went to Kodaikanal and rode pedal boats on the serene lake.",
            ta: "நாங்கள் கொடைக்கானல் சென்று ஏரியில் படகு சவாரி செய்தோம்.",
          },
          {
            en: "I visited my ancestral village and enjoyed fresh tender coconuts.",
            ta: "என் சொந்த ஊருக்குச் சென்று இளநீர் குடித்து மகிழ்ந்தேன்.",
          },
        ],
        coachTip: "Use adjectives like 'serene', 'chilly', 'breezy', or 'vibrant'.",
      },
      {
        id: 'travel-4',
        en: "What are three important things you always pack in your travel bag?",
        ta: "பயணத்தின் போது உங்கள் பையில் எப்போதும் எடுத்துச் செல்லும் மூன்று பொருட்கள் என்ன?",
        starters: [
          {
            en: "I always pack my water bottle, a storybook, and a warm jacket.",
            ta: "தண்ணீர் பாட்டில், கதை புத்தகம் மற்றும் குளிர்கால ஆடை எடுத்துக்கொள்வேன்.",
          },
          {
            en: "I pack snacks, my drawing notebook, and my camera.",
            ta: "தின்பண்டங்கள், வரையும் குறிப்பேடு மற்றும் கேமரா எடுத்துக்கொள்வேன்.",
          },
        ],
        coachTip: "List items using commas and 'and'.",
      },
      {
        id: 'travel-5',
        en: "What was the most exciting thing you saw on a journey recently?",
        ta: "சமீபத்திய பயணத்தின் போது நீங்கள் பார்த்த மிகவும் உற்சாகமான விஷயம் என்ன?",
        starters: [
          {
            en: "I saw a herd of wild deer grazing near the forest road.",
            ta: "காட்டுப்பாதையின் ஓரத்தில் மான்கள் கூட்டமாக மேய்வதைப் பார்த்தேன்.",
          },
          {
            en: "I saw a magnificent waterfall cascading down green cliffs.",
            ta: "பசுமையான பாறைகளில் இருந்து விழும் அருவியைப் பார்த்தேன்.",
          },
        ],
        coachTip: "Paint a vivid mental picture with descriptive words.",
      },
    ],
  },
];
