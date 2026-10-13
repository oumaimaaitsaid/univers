import { Language } from '../types';

export interface EventItem {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  time: string;
  location: string;
  description: string;
  isPast?: boolean;
}

export interface ActivityDetail {
  number: string;
  title: string;
  description: string;
  details: string;
  imageFileName: string;
  aspectRatio: string;
  hasOffsetNavy?: boolean;
  hasGoldBorder?: boolean;
}

export interface SiteData {
  brand: {
    name: string;
    arabicName: string;
    subtitle: string;
    tagline: string;
    values: {
      animation: { title: string; desc: string };
      culture: { title: string; desc: string };
      solidarity: { title: string; desc: string };
    };
  };
  nav: {
    home: string;
    about: string;
    activities: string;
    events: string;
    gallery: string;
    contact: string;
    joinBtn: string;
  };
  hero: {
    kicker: string;
    title: string;
    tagline: string;
    intro: string;
    btnActivities: string;
    btnInstagram: string;
  };
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    infoPill: string;
    teamNotice: string;
  };
  activities: {
    label: string;
    title: string;
    subtitle: string;
    items: ActivityDetail[];
  };
  events: {
    label: string;
    title: string;
    subtitle: string;
    upcomingTab: string;
    pastTab: string;
    timeLabel: string;
    locationLabel: string;
    emptyUpcoming: string;
    emptyPast: string;
  };
  gallery: {
    label: string;
    title: string;
    subtitle: string;
    instruction: string;
  };
  instagram: {
    title: string;
    subtitle: string;
    btnText: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    formTitle: string;
    membershipTitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendBtn: string;
    membershipBtn: string;
    successMessage: string;
    addressLabel: string;
    addressValue: string;
    phoneValue: string;
    emailValue: string;
    hoursLabel: string;
    hoursValue: string;
    mapPlaceholderNotice: string;
    openMapLink: string;
  };
  footer: {
    quickLinks: string;
    contact: string;
    social: string;
    copyright: string;
  };
}

export const SITE_DATA: Record<Language, SiteData> = {
  fr: {
    brand: {
      name: 'Univers Anim',
      arabicName: 'جمعية يونيفر أنيم',
      subtitle: 'ASSOCIATION',
      tagline: 'Ensemble pour un avenir meilleur',
      values: {
        animation: {
          title: 'Animation',
          desc: 'Activités participatives, sorties collectives et moments de convivialité pour les jeunes et les familles d’Asfi.',
        },
        culture: {
          title: 'Culture',
          desc: 'Pratique du théâtre, de la musique acoustique et organisation de rencontres artistiques locales.',
        },
        solidarity: {
          title: 'Solidarité',
          desc: 'Actions citoyennes, entraide de proximité et intégration des jeunes par les projets collectifs.',
        },
      },
    },
    nav: {
      home: 'Accueil',
      about: 'À propos',
      activities: 'Activités',
      events: 'Événements',
      gallery: 'Galerie',
      contact: 'Contact',
      joinBtn: 'Adhérer',
    },
    hero: {
      kicker: 'ASSOCIATION CULTURELLE · ASFI',
      title: 'Univers Anim',
      tagline: 'Ensemble pour un avenir meilleur',
      intro:
        'Association culturelle et citoyenne à Asfi. Nous réunissons les jeunes et les habitants autour de la musique, du théâtre, d’ateliers pratiques et d’initiatives solidaires.',
      btnActivities: 'Voir nos activités',
      btnInstagram: 'Suivre sur Instagram',
    },
    about: {
      label: 'L’ASSOCIATION',
      title: 'Une initiative citoyenne ancrée à Asfi',
      paragraph1:
        'Fondée en [À REMPLACER: année de création] à Asfi, Univers Anim est une association à but non lucratif née de la volonté d’animer la vie culturelle locale et de proposer des activités régulières aux enfants et aux jeunes.',
      paragraph2:
        'Nos membres bénévoles organisent des ateliers de théâtre, des répétitions musicales, des sorties éducatives et participent aux événements de la ville. Nous croyons à l’action concrète de terrain et à la solidarité entre générations.',
      infoPill: 'Statut : Association déclarée à Asfi · Région Marrakech-Safi',
      teamNotice:
        'Bureau et équipe d’animation : [À REMPLACER: nom du président / équipe dirigeante et bénévoles actifs]',
    },
    activities: {
      label: 'NOS ACTIVITÉS',
      title: 'Quatre pôles d’action tout au long de l’année',
      subtitle:
        'Des ateliers hebdomadaires et des projets concrets encadrés par des bénévoles et des intervenants locaux.',
      items: [
        {
          number: '01',
          title: 'Musique & Pratique instrumentale',
          description:
            'Apprentissage et répétition d’instruments (guitare, luth, percussions) et chant en groupe. Organisation de petites scènes acoustiques de quartier.',
          details: 'Répétitions régulières · Ouvert aux débutants et initiés',
          imageFileName: '/images/musique.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasOffsetNavy: true,
        },
        {
          number: '02',
          title: 'Théâtre & Expression scénique',
          description:
            'Initiation au jeu d’acteur, exercices de voix, improvisation et préparation de courtes pièces présentées devant le public d’Asfi.',
          details: 'Séances d’improvisation · Travail de texte en arabe et français',
          imageFileName: '/images/theatre.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasGoldBorder: true,
        },
        {
          number: '03',
          title: 'Ateliers jeunesse & Loisirs créatifs',
          description:
            'Activités manuelles, dessin, fabrication d’accessoires pour les spectacles et jeux d’animation pour les enfants pendant les week-ends et vacances.',
          details: 'Enfants et adolescents · Matériel fourni lors des ateliers',
          imageFileName: '/images/atelier-1.jpg',
          aspectRatio: 'aspect-[16/9]',
          hasOffsetNavy: false,
        },
        {
          number: '04',
          title: 'Événements & Festivals de proximité',
          description:
            'Participation aux fêtes locales, organisation de soirées culturelles, journées de solidarité et rencontres inter-associatives à Safi.',
          details: 'Manifestations ouvertes à tous les habitants de la ville',
          imageFileName: '/images/festival-1.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasOffsetNavy: true,
          hasGoldBorder: true,
        },
      ],
    },
    events: {
      label: 'CALENDRIER',
      title: 'Agenda des activités et rendez-vous',
      subtitle:
        'Retrouvez les prochaines rencontres d’Univers Anim à Asfi. Toutes les activités sont annoncées ici.',
      upcomingTab: 'À venir',
      pastTab: 'Événements passés',
      timeLabel: 'Horaire',
      locationLabel: 'Lieu',
      emptyUpcoming: 'Aucun événement public programmé pour l’instant. Les prochaines dates seront publiées sous peu.',
      emptyPast: 'Aucun événement archivé pour cette période.',
    },
    gallery: {
      label: 'EN IMAGES',
      title: 'Moments forts des ateliers et rencontres',
      subtitle:
        'Photos prises lors de nos répétitions, ateliers avec les jeunes et sorties sur le terrain à Asfi.',
      instruction: 'Cliquez sur un cadre pour agrandir.',
    },
    instagram: {
      title: 'Suivez la vie de l’association sur Instagram',
      subtitle:
        'Photos des coulisses, annonces de répétitions et moments de convivialité partagés en direct.',
      btnText: 'Suivre @association.universanim',
    },
    contact: {
      label: 'CONTACT & ADHÉSION',
      title: 'Nous écrire ou rejoindre l’association',
      subtitle:
        'Vous souhaitez inscrire votre enfant, participer aux ateliers en tant que bénévole ou poser une question ? Écrivez-nous.',
      formTitle: 'Envoyer un message',
      membershipTitle: 'Demande d’adhésion',
      nameLabel: 'Nom complet',
      phoneLabel: 'Téléphone',
      emailLabel: 'Adresse email',
      messageLabel: 'Message ou projet',
      sendBtn: 'Envoyer le message',
      membershipBtn: 'Soumettre ma demande d’adhésion',
      successMessage:
        'Votre message a bien été transmis aux responsables d’Univers Anim. Nous vous répondrons dès que possible.',
      addressLabel: 'Siège associatif',
      addressValue: '[À REMPLACER: adresse ou local de l’association à Asfi]',
      phoneValue: '[À REMPLACER: numéro de téléphone officiel]',
      emailValue: '[À REMPLACER: contact@universanim.org]',
      hoursLabel: 'Permanences & Accueil',
      hoursValue: '[À REMPLACER: jours et créneaux de permanence]',
      mapPlaceholderNotice: 'Localisation : Asfi (Safi), Maroc',
      openMapLink: 'Ouvrir sur Google Maps',
    },
    footer: {
      quickLinks: 'Navigation',
      contact: 'Coordonnées',
      social: 'Réseaux',
      copyright: '© 2026 Univers Anim. Tous droits réservés.',
    },
  },
  ar: {
    brand: {
      name: 'Univers Anim',
      arabicName: 'جمعية يونيفر أنيم',
      subtitle: 'جمعية',
      tagline: 'معاً من أجل مستقبل أفضل',
      values: {
        animation: {
          title: 'التنشيط',
          desc: 'أنشطة تفاعلية، خرجات جماعية، وأجواء ترفيهية وتربوية موجهة لشباب وأسر مدينة أسفي.',
        },
        culture: {
          title: 'الثقافة',
          desc: 'ممارسة المسرح والموسيقى الحية، وتنظيم لقاءات فنية تسهم في إثراء المشهد الثقافي المحلي.',
        },
        solidarity: {
          title: 'التضامن',
          desc: 'مبادرات تطوعية وتضامنية لتعزيز قيم المواطنة والاندماج الإيجابي للناشئة.',
        },
      },
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن الجمعية',
      activities: 'الأنشطة',
      events: 'البرنامج',
      gallery: 'الصور',
      contact: 'الاتصال',
      joinBtn: 'الانخراط',
    },
    hero: {
      kicker: 'جمعية ثقافية · أسفي',
      title: 'يونيفر أنيم',
      tagline: 'معاً من أجل مستقبل أفضل',
      intro:
        'جمعية ثقافية ومواطنة بمدينة أسفي. نجمع الشباب والأطفال وسكان المدينة حول الموسيقى، المسرح، الورشات التطبيقية، والمبادرات التضامنية الهادفة.',
      btnActivities: 'أنشطتنا السنوية',
      btnInstagram: 'تابعنا على إنستغرام',
    },
    about: {
      label: 'التعريف بالجمعية',
      title: 'مبادرة مدنية راسخة في مدينة أسفي',
      paragraph1:
        'تأسست جمعية "يونيفر أنيم" سنة [À REMPLACER: سنة التأسيس] بأسفي، وهي جمعية غير ربحية تهدف إلى تنشيط الحياة الثقافية وتوفير فضاءات للتعبير والتكوين لفائدة الأطفال والشباب.',
      paragraph2:
        'يؤطر المتطوعون ورشات منتظمة في الفنون المسرحية والموسيقية والأنشطة الإبداعية. نعتمد على العمل الميداني البسيط والصادق لخدمة مجتمعنا المحلي.',
      infoPill: 'الصفة : جمعية مصرح بها بأسفي · جهة مراكش-أسفي',
      teamNotice:
        'المكتب المسير : [À REMPLACER: رئيس الجمعية وأعضاء المكتب التنفيذي والمتطوعون]',
    },
    activities: {
      label: 'مجالات النشاط',
      title: 'أربعة محاور رئيسية على مدار السنة',
      subtitle:
        'ورشات تطبيقية ومشاريع يشرف عليها متطوعون وفاعلون محليون بمدينة أسفي.',
      items: [
        {
          number: '01',
          title: 'الموسيقى والعزف الجماعي',
          description:
            'تداريب على الآلات الموسيقية (العود، القيثارة، الإيقاع) والغناء الجماعي، وتنظيم جلسات موسيقية مصغرة.',
          details: 'حصص أسبوعية · مفتوحة لجميع المستويات',
          imageFileName: '/images/musique.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasOffsetNavy: true,
        },
        {
          number: '02',
          title: 'المسرح وفنون الأداء',
          description:
            'تمارين في تقنيات الممثل، مخارج الحروف، التعبير الجسدي والارتجال، مع إعداد لوحات مسرحية هادفة.',
          details: 'تمارين الارتجال · نصوص بالدارجة والعربية والفرنسية',
          imageFileName: '/images/theatre.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasGoldBorder: true,
        },
        {
          number: '03',
          title: 'ورشات الأطفال والناشئة',
          description:
            'أشغال يدوية، رسم، صناعة أقنعة وإكسسوارات العروض، وألعاب تنشيطية وتربوية خلال نهاية الأسبوع والعطل.',
          details: 'للأطفال والمراهقين · توفير المواد والأدوات',
          imageFileName: '/images/atelier-1.jpg',
          aspectRatio: 'aspect-[16/9]',
          hasOffsetNavy: false,
        },
        {
          number: '04',
          title: 'التظاهرات والملتقيات المحلية',
          description:
            'المشاركة في الأعياد والمناسبات المحلية بأسفي، وتنظيم أمسيات تضامنية وأنشطة مشتركة مع الجمعيات الشريكة.',
          details: 'مفتوحة للعموم في ساحات وفضاءات المدينة',
          imageFileName: '/images/festival-1.jpg',
          aspectRatio: 'aspect-[4/3]',
          hasOffsetNavy: true,
          hasGoldBorder: true,
        },
      ],
    },
    events: {
      label: 'الأجندة',
      title: 'مواعيد الأنشطة واللقاءات',
      subtitle:
        'تابعوا المواعيد المقبلة لجمعية يونيفر أنيم بأسفي. يتم تحيين البرنامج بانتظام.',
      upcomingTab: 'القادمة',
      pastTab: 'السابقة',
      timeLabel: 'التوقيت',
      locationLabel: 'المكان',
      emptyUpcoming: 'لا توجد فعاليات مبرمجة حالياً. سيتم نشر المواعيد الجديدة قريباً.',
      emptyPast: 'لا توجد فعاليات سابقة مسجلة في هذا القسم.',
    },
    gallery: {
      label: 'معرض الصور',
      title: 'لقطات من التداريب والأنشطة',
      subtitle:
        'صور ملتقطة خلال الورشات التكوينية واللقاءات مع شباب وأطفال أسفي.',
      instruction: 'انقر على أي إطار للمعاينة.',
    },
    instagram: {
      title: 'تابعوا مستجدات الجمعية عبر إنستغرام',
      subtitle:
        'صور الكواليس، إعلانات التداريب، والأنشطة الميدانية عبر حسابنا الرسمي.',
      btnText: 'متابعة @association.universanim',
    },
    contact: {
      label: 'الاتصال والانخراط',
      title: 'تواصل معنا أو انضم إلى الجمعية',
      subtitle:
        'هل تود تسجيل ابنك في الورشات، التطوع معنا، أو طرح سؤال؟ نسعد بتواصلك.',
      formTitle: 'إرسال رسالة',
      membershipTitle: 'طلب الانخراط كعضو',
      nameLabel: 'الاسم الكامل',
      phoneLabel: 'الهاتف',
      emailLabel: 'البريد الإلكتروني',
      messageLabel: 'الرسالة أو الرغبة في الانخراط',
      sendBtn: 'إرسال الرسالة',
      membershipBtn: 'إرسال طلب الانخراط',
      successMessage:
        'شكراً لك، تم استلام رسالتك وسيتم الرد عليك في أقرب وقت من طرف المشرفين.',
      addressLabel: 'مقر الجمعية بأسفي',
      addressValue: '[À REMPLACER: العنوان أو المقر المعتمد بأسفي]',
      phoneValue: '[À REMPLACER: رقم الهاتف الرسمي]',
      emailValue: '[À REMPLACER: contact@universanim.org]',
      hoursLabel: 'أوقات الاستقبال',
      hoursValue: '[À REMPLACER: أوقات المداومة الأسبوعية]',
      mapPlaceholderNotice: 'الموقع : مدينة أسفي، المغرب',
      openMapLink: 'فتح خرائط جوجل',
    },
    footer: {
      quickLinks: 'روابط سريعة',
      contact: 'معلومات الاتصال',
      social: 'التواصل الاجتماعي',
      copyright: '© 2026 جمعية يونيفر أنيم. جميع الحقوق محفوظة.',
    },
  },
};

// Events agenda list (Real format with placeholders, no invented fake events)
export const EVENTS_LIST: EventItem[] = [
  {
    id: 'ev-1',
    day: '18',
    month: 'NOV',
    year: '2026',
    title: 'Atelier découverte : Musique et Rythmes pour les jeunes',
    time: '[À REMPLACER: heure]',
    location: '[À REMPLACER: lieu à Asfi, ex: Maison des Jeunes]',
    description:
      'Séance d’initiation aux instruments acoustiques et découverte des percussions traditionnelles pour les débutants.',
    isPast: false,
  },
  {
    id: 'ev-2',
    day: '05',
    month: 'DÉC',
    year: '2026',
    title: 'Répétition ouverte et exercices de théâtre',
    time: '[À REMPLACER: heure]',
    location: '[À REMPLACER: salle ou espace culturel à Asfi]',
    description:
      'Rencontre mensuelle de la troupe théâtrale pour travailler l’improvisation et la mise en voix de nouveaux textes.',
    isPast: false,
  },
  {
    id: 'ev-3',
    day: '14',
    month: 'OCT',
    year: '2026',
    title: 'Atelier de rentrée et inscriptions aux activités',
    time: '16:00 - 19:00',
    location: 'Asfi',
    description:
      'Accueil des adhérents et présentation du calendrier annuel des ateliers jeunesse et culture.',
    isPast: true,
  },
  {
    id: 'ev-4',
    day: '22',
    month: 'SEP',
    year: '2026',
    title: 'Journée d’animation de quartier et solidarité',
    time: '15:00 - 18:30',
    location: 'Asfi',
    description:
      'Activités de plein air avec les enfants du quartier : contes, dessin et jeux collectifs.',
    isPast: true,
  },
];

// Gallery placeholders specifications (all referencing clean filenames in /images/)
export interface GalleryItemSpec {
  id: string;
  fileName: string;
  formatLabel: string;
  aspectRatio: string;
  captionFr: string;
  captionAr: string;
  hasOffsetNavy?: boolean;
}

export const GALLERY_SPECS: GalleryItemSpec[] = [
  {
    id: 'g-1',
    fileName: '/images/galerie-1.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Atelier de pratique théâtrale à Asfi',
    captionAr: 'ورشة التكوين المسرحي بأسفي',
    hasOffsetNavy: true,
  },
  {
    id: 'g-2',
    fileName: '/images/galerie-2.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Répétition musicale et chants collectifs',
    captionAr: 'تداريب موسيقية وأداء جماعي',
  },
  {
    id: 'g-3',
    fileName: '/images/galerie-3.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Activités manuelles et dessin avec les enfants',
    captionAr: 'أشغال يدوية ورسم مع أطفال الجمعية',
  },
  {
    id: 'g-4',
    fileName: '/images/galerie-4.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Sortie citoyenne et animation de plein air',
    captionAr: 'نشاط تربوي وتنشيطي في الهواء الطلق',
    hasOffsetNavy: true,
  },
  {
    id: 'g-5',
    fileName: '/images/galerie-5.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Moments d’échange entre bénévoles et participants',
    captionAr: 'لقاء تواصلي بين المتطوعين والمشاركين',
  },
  {
    id: 'g-6',
    fileName: '/images/galerie-6.jpg',
    formatLabel: 'PHOTO À AJOUTER (format 4:3)',
    aspectRatio: 'aspect-[4/3]',
    captionFr: 'Rencontre annuelle et clôture d’activité',
    captionAr: 'اختتام الموسم التنشيطي والاحتفاء بالناشئة',
  },
];
