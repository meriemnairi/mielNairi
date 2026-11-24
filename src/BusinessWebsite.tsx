import { useEffect, useState } from "react";

type Language = "fr" | "ar";

/* ------------------------------------------------------------------ */
/*  À MODIFIER : vos liens                                             */
/*  Images attendues dans /public :                                    */
/*  bee1.png, bee2.png, logo.png, qrcode.png                           */
/*  Miel1.png (Oranger), Miel2.png (Thym), Miel3.png (Eucalyptus),     */
/*  Miels.png (photo de groupe)                                        */
/* ------------------------------------------------------------------ */
const PHONE_INTL = "21697364230";
const WHATSAPP_INTL = "21624402312";
const INSTAGRAM =
  "https://www.instagram.com/mielnairi5170?evlk=OWs5OGVvZGhza2Ux";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(INSTAGRAM)}`;
const wa = (text: string) =>
  `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(text)}`;

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;500;600;700&family=Cairo:wght@400;600;700;900&display=swap");

body{ margin:0; }
.mn{
  --cream:#fdf1dc; --paper:#fff6ea; --brown:#7a3f10; --brown-d:#4a2b08;
  --orange:#e8921a; --amber:#ffc05a; --amber-d:#d97f10; --ink:#2f2c36;
  --display:"Pacifico","Brush Script MT",cursive; --leaf:#7d9b3b;
  --body:"Quicksand","Segoe UI",sans-serif;
  font-family:var(--body); color:var(--ink); background:var(--cream);
  min-height:100vh; overflow-x:hidden; position:relative; line-height:1.65;
}
.mn[dir="rtl"]{ --display:"Cairo",sans-serif; --body:"Cairo",sans-serif; }
.mn *{ box-sizing:border-box; }
.mn a{ color:inherit; text-decoration:none; }
.mn img{ display:block; max-width:100%; }
.mn :focus-visible{ outline:3px solid var(--brown); outline-offset:3px; border-radius:8px; }
.wrap{ max-width:1180px; margin-inline:auto; padding-inline:24px; position:relative; }

/* nav */
.nav{ position:sticky; top:0; z-index:20; backdrop-filter:blur(10px); background:rgba(253,241,220,.86); border-bottom:1px solid rgba(123,74,16,.12); }
.nav .wrap{ display:flex; align-items:center; justify-content:space-between; gap:22px; min-height:76px; padding-block:10px; }
.logo{ font-family:var(--display); font-size:1.3rem; font-weight:400; color:var(--brown); line-height:1; display:flex; align-items:center; gap:0; margin-inline-end:0; }
.logo img{ width:60px; height:60px; object-fit:contain; display:block; }
.links{ display:flex; gap:32px; font-weight:700; font-size:.9rem; color:var(--brown-d); }
.links a{ padding-block:6px; background:linear-gradient(var(--orange),var(--orange)) bottom/0 3px no-repeat; transition:background-size .25s; }
.links a:hover{ background-size:100% 3px; }
.lang{ display:flex; background:#fff; border:1px solid rgba(123,74,16,.18); border-radius:999px; padding:3px; }
.lang button{ border:0; background:none; font:inherit; font-size:.76rem; font-weight:700; padding:5px 11px; border-radius:999px; cursor:pointer; color:var(--brown); }
.lang button.on{ background:var(--brown); color:#fff; }

/* hero */
.hero{ display:grid; grid-template-columns:1.15fr .85fr; gap:30px; align-items:center; padding-block:56px 70px; min-height:calc(100vh - 80px); }
.pill{ display:inline-flex; gap:8px; align-items:center; background:#fff; border:1px solid rgba(123,74,16,.15); padding:7px 15px; border-radius:999px; font-weight:600; font-size:.9rem; color:var(--brown); }
.title{ position:relative; }
.hero h1{ font-family:var(--display); font-weight:400; color:var(--brown); font-size:clamp(4rem,9.5vw,8rem); line-height:1.02; margin:22px 0 0; text-shadow:0 5px 0 rgba(122,63,16,.08); }
.hero h1 span{ display:block; }
.hero h1 .l2{ margin-inline-start:.55em; }
.mn[dir="rtl"] .hero h1 .l2{ margin:0; }
.splash{ position:absolute; width:86px; inset-inline-start:-6px; top:-22px; z-index:1; }
.splash path{ transform-box:fill-box; transform-origin:bottom; animation:splash 3.6s ease-in-out infinite; }
.splash path:nth-child(2){ animation-delay:.5s; }
@keyframes splash{ 0%,100%{ transform:scale(1) translateY(0); } 50%{ transform:scale(1.12,.92) translateY(-4px); } }
.swoosh{ display:block; width:min(460px,92%); margin:2px 0 0; overflow:visible; }
.swoosh .body{ transform-origin:left center; animation:draw 1.4s cubic-bezier(.3,.8,.3,1) .5s both; }
.swoosh .dr{ transform-box:fill-box; transform-origin:top; animation:dropgrow 2.4s ease-in-out 1.6s infinite; }
@keyframes draw{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }
@keyframes dropgrow{ 0%{ transform:scaleY(.2); } 60%,100%{ transform:scaleY(1); } }
.mn[dir="rtl"] .hero h1{ font-size:clamp(3.4rem,9vw,6.5rem); line-height:1.2; font-weight:900; }
.hero .variety{ font-size:clamp(1.3rem,2.3vw,1.8rem); color:var(--orange); font-weight:400; margin:6px 0 0; font-family:var(--display); }
.hero .variety b{ font-weight:700; }
.hero p.lead{ max-width:520px; font-size:1.08rem; margin:18px 0 0; color:#4b4450; }
.row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:26px; }
.btn{ display:inline-flex; align-items:center; gap:10px; min-height:52px; padding:0 24px; border-radius:999px; font-weight:700; border:2px solid var(--brown); transition:transform .2s, box-shadow .2s; cursor:pointer; }
.btn:hover{ transform:translateY(-3px); box-shadow:0 8px 0 rgba(123,74,16,.18); }
.btn.fill{ background:var(--orange); border-color:var(--orange); color:#fff; box-shadow:0 6px 0 var(--amber-d); }
.btn.fill:hover{ box-shadow:0 9px 0 var(--amber-d); }
.btn.line{ background:transparent; color:var(--brown); }
.facts{ display:grid; gap:10px; margin-top:30px; font-weight:600; font-size:1.05rem; }
.facts span{ display:flex; align-items:center; gap:12px; }
.facts .ic{ color:var(--orange); }

/* honeycomb */
.comb-stage{ position:relative; display:grid; place-items:center; min-height:470px; }
.comb{ --w:132px; display:flex; flex-direction:column; align-items:center; }
.comb .r{ display:flex; gap:6px; margin-top:calc(var(--w) * -.205); }
.comb .r:first-child{ margin-top:0; }
.hex{ width:var(--w); height:calc(var(--w) * 1.1547); clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);
  background:var(--c); display:grid; place-items:center; animation:pop .7s cubic-bezier(.2,1.4,.4,1) calc(var(--i) * 110ms + .4s) both; }
.hex.sm{ background:var(--c); }
@keyframes pop{ from{ transform:scale(0) rotate(-30deg); opacity:0; } to{ transform:none; opacity:1; } }
.comb-stage .mascot{ position:absolute; width:210px; z-index:3; animation:bob 4s ease-in-out infinite; filter:drop-shadow(0 14px 12px rgba(74,43,8,.25)); }
@keyframes bob{ 0%,100%{ transform:translateY(0) rotate(-3deg); } 50%{ transform:translateY(-14px) rotate(3deg); } }
.flag{ position:absolute; inset-inline-end:4%; top:2%; width:78px; height:78px; border-radius:50%; background:#fff; border:4px solid #fff; box-shadow:0 8px 18px rgba(74,43,8,.18); display:grid; place-items:center; z-index:4; }
.flag svg{ width:100%; height:100%; }

/* flying bees */
.fly{ position:absolute; z-index:5; pointer-events:none; width:var(--s); left:-10%; top:var(--t); animation:cross var(--dur) linear var(--dl) infinite; }
@keyframes cross{
  0%{ transform:translate(0,0) rotate(8deg); }
  20%{ transform:translate(22vw,-50px) rotate(-10deg); }
  40%{ transform:translate(44vw,30px) rotate(10deg); }
  60%{ transform:translate(66vw,-40px) rotate(-8deg); }
  80%{ transform:translate(88vw,20px) rotate(8deg); }
  100%{ transform:translate(115vw,-30px) rotate(0); } }
.fly img{ animation:wing .35s ease-in-out infinite alternate; }
@keyframes wing{ to{ transform:scaleY(.93) translateY(2px); } }

/* sections */
.sec{ padding-block:80px; position:relative; }
.sec h2{ font-family:var(--display); font-size:clamp(2rem,3.6vw,2.9rem); line-height:1.25; margin:0 0 12px; color:var(--brown); font-weight:400; }
.mn[dir="rtl"] .sec h2{ font-weight:900; font-size:clamp(2rem,4vw,3.2rem); line-height:1.3; }
.sec .sub{ max-width:620px; margin:0 0 40px; font-size:1.05rem; color:#4b4450; }
.band{ background:var(--paper); }
.pills{ display:flex; flex-wrap:wrap; gap:10px; padding-block:6px 0; }
.pills span{ display:inline-flex; align-items:center; gap:8px; background:#fff; border:1.5px dashed var(--amber-d); border-radius:999px; padding:9px 18px; font-weight:700; color:var(--brown); }

/* products: honeycomb-cut tabs */
.prods{ display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
.prod{ background:#fff; border-radius:30px 30px 30px 8px; padding:26px 24px 24px; border:2px solid rgba(123,74,16,.12); position:relative; display:flex; flex-direction:column; transition:transform .25s, border-color .25s; }
.prod:hover{ transform:translateY(-6px) rotate(-.6deg); border-color:var(--orange); }
.tag{ position:absolute; top:-14px; inset-inline-start:22px; background:var(--brown); color:#fff; font-weight:700; font-size:.8rem; padding:5px 14px; border-radius:999px; z-index:2; }
.prod h3{ margin:0; font-family:var(--display); font-size:1.6rem; color:var(--brown); line-height:1.3; font-weight:400; }
.mn[dir="rtl"] .prod h3{ font-size:1.7rem; font-weight:900; }
.prod p{ margin:10px 0 14px; color:#4b4450; }
.prod dl{ margin:0 0 20px; display:grid; gap:6px; font-size:.93rem; }
.prod dl div{ display:flex; gap:10px; border-top:1px dashed rgba(123,74,16,.25); padding-top:6px; }
.prod dt{ font-weight:700; color:var(--brown); min-width:84px; }
.prod dd{ margin:0; }
.prod .btn{ margin-top:auto; justify-content:center; min-height:46px; }

/* product photos */
.prod .photo{ width:100%; height:270px; object-fit:contain; margin:6px 0 16px; filter:drop-shadow(0 14px 12px rgba(74,43,8,.22)); transition:transform .3s; }
.prod:hover .photo{ transform:scale(1.05) rotate(-2deg); }
.prod .about{ margin:10px 0 12px; color:#4b4450; }
.prod h4{ margin:4px 0 8px; font-size:.95rem; color:var(--brown); }
.prod ul{ list-style:none; margin:0 0 18px; padding:0; display:grid; gap:7px; font-size:.93rem; }
.prod li{ display:flex; gap:8px; align-items:flex-start; }
.prod li .ic{ width:18px; height:18px; color:var(--leaf); margin-top:3px; }
.disclaimer{ margin-top:26px; font-size:.85rem; color:#7a6a58; text-align:center; }

/* gallery in "Comment le déguster" */
.gallery{ margin:0 0 40px; border-radius:32px; overflow:hidden; box-shadow:0 18px 40px rgba(74,43,8,.2); border:4px solid #fff; }
.gallery img{ width:100%; height:auto; max-height:520px; object-fit:cover; }

/* use */
.uses{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
.use{ text-align:center; padding:22px 14px; }
.use .hex{ --w:92px; margin:0 auto 14px; animation:none; font-size:2.1rem; }
.use h3{ margin:0 0 6px; font-size:1.1rem; color:var(--brown-d); }
.use p{ margin:0; font-size:.95rem; color:#4b4450; }

/* story */
.story{ display:grid; grid-template-columns:.8fr 1.2fr; gap:50px; align-items:start; }
.story .art{ position:relative; display:grid; place-items:center; }
.story .art .blob{ position:absolute; width:88%; aspect-ratio:1; background:var(--amber); border-radius:46% 54% 52% 48%/55% 45% 55% 45%; animation:morph 9s ease-in-out infinite alternate; }
@keyframes morph{ to{ border-radius:58% 42% 40% 60%/42% 58% 42% 58%; transform:rotate(8deg); } }
.story .art img{ position:relative; width:78%; animation:bob 5s ease-in-out infinite; }
.points{ display:grid; gap:12px; margin-top:22px; }
.points div{ display:flex; gap:12px; align-items:flex-start; font-weight:600; }
.points .ic{ color:var(--orange); margin-top:4px; }

/* process */
.steps{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; position:relative; }
.step{ background:#fff; border-radius:24px; padding:26px 22px; border:2px solid rgba(123,74,16,.1); }
.step .n{ width:52px; height:58px; clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%); background:var(--orange); color:#fff; font-weight:800; font-size:1.3rem; display:grid; place-items:center; margin-bottom:14px; }
.step h3{ margin:0 0 6px; color:var(--brown-d); }
.step p{ margin:0; color:#4b4450; }

/* notes + faq */
.two{ display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start; }
.notes{ display:grid; gap:14px; }
.note{ display:flex; gap:14px; background:#fff; border-radius:20px; padding:18px; border-inline-start:6px solid var(--amber); }
.note b{ display:block; color:var(--brown-d); }
.note span{ font-size:.95rem; color:#4b4450; }
details{ background:#fff; border-radius:18px; padding:0 20px; margin-bottom:12px; border:2px solid rgba(123,74,16,.1); transition:border-color .2s; }
details[open]{ border-color:var(--orange); }
summary{ cursor:pointer; list-style:none; padding:16px 0; font-weight:700; color:var(--brown-d); display:flex; justify-content:space-between; gap:12px; }
summary::-webkit-details-marker{ display:none; }
summary::after{ content:"+"; font-size:1.5rem; line-height:1; color:var(--orange); transition:transform .25s; }
details[open] summary::after{ transform:rotate(45deg); }
details p{ margin:0 0 16px; color:#4b4450; }

/* contact */
.contact{ background:var(--brown); color:#fff; border-radius:40px; padding:46px; display:grid; grid-template-columns:1.3fr .7fr; gap:36px; align-items:center; position:relative; overflow:hidden; }
.contact h2{ color:#fff; }
.contact .sub{ color:#f6dcb8; }
.contact .list{ display:grid; gap:14px; margin-top:8px; font-weight:600; font-size:1.1rem; }
.contact .list a,.contact .list span{ display:flex; gap:12px; align-items:center; }
.contact .list .ic{ color:var(--amber); }
.qr{ background:var(--cream); color:var(--brown-d); border-radius:26px; padding:18px; text-align:center; font-weight:700; }
.qr img{ width:100%; border-radius:12px; margin-bottom:10px; background:#fff; }

/* footer */
.foot{ background:var(--brown-d); color:#f6dcb8; margin-top:40px; padding:0; text-align:start; font-weight:500; position:relative; }
.foot::before{ content:""; display:block; height:14px; background:repeating-linear-gradient(90deg,var(--amber) 0 28px,var(--orange) 28px 56px); }
.foot-in{ display:grid; grid-template-columns:1.2fr .8fr 1fr .8fr; gap:40px; padding-block:50px 34px; }
.foot h4{ margin:0 0 14px; color:#fff; font-family:var(--display); font-weight:400; font-size:1.3rem; }
.mn[dir="rtl"] .foot h4{ font-weight:900; }
.foot-brand img{ width:90px; height:90px; object-fit:contain; background:var(--cream); border-radius:50%; padding:6px; margin-bottom:12px; }
.foot-brand p{ margin:0 0 16px; max-width:320px; }
.foot nav,.foot .fcol{ display:grid; gap:10px; }
.foot a{ display:inline-flex; gap:10px; align-items:center; transition:color .2s; }
.foot a:hover{ color:var(--amber); }
.foot .ic{ color:var(--amber); width:20px; height:20px; }
.foot-qr{ display:flex; flex-direction:column; align-items:flex-start; gap:12px; }
.foot-qr a.qrbox{ display:block; background:#fff; border-radius:18px; padding:10px; width:150px; box-shadow:0 10px 22px rgba(0,0,0,.28); transition:transform .2s; }
.foot-qr a.qrbox:hover{ transform:translateY(-4px) rotate(-1.5deg); color:inherit; }
.foot-qr a.qrbox img{ width:100%; height:auto; border-radius:8px; }
.foot-qr small{ font-size:.85rem; color:#d9b98a; max-width:170px; line-height:1.5; }
.foot-bottom{ border-top:1px solid rgba(255,255,255,.12); padding:18px 24px 96px; text-align:center; font-size:.88rem; color:#d9b98a; }
.foot-bottom a{ color:var(--amber); }
.fab{ position:fixed; inset-inline-end:20px; bottom:20px; z-index:40; width:60px; height:60px; border-radius:50%; background:#25d366; color:#fff; display:grid; place-items:center; box-shadow:0 10px 22px rgba(0,0,0,.25); animation:ring 3s ease-in-out infinite; }
.fab .ic{ width:30px; height:30px; color:#fff; }
@keyframes ring{ 0%,86%,100%{ transform:none; } 90%{ transform:rotate(-14deg); } 94%{ transform:rotate(14deg); } 98%{ transform:rotate(-8deg); } }

.fl{ position:absolute; z-index:1; pointer-events:none; width:var(--s,36px); inset-inline-start:var(--x); top:var(--y); animation:floaty var(--dur,7s) ease-in-out var(--dl,0s) infinite; opacity:.95; }
.fl img{ width:100%; transform:scaleX(var(--f,1)); }
@keyframes floaty{
  0%{ transform:translate(0,0) rotate(-6deg); }
  25%{ transform:translate(26px,-22px) rotate(8deg); }
  50%{ transform:translate(-8px,-40px) rotate(-4deg); }
  75%{ transform:translate(-30px,-14px) rotate(10deg); }
  100%{ transform:translate(0,0) rotate(-6deg); } }
@media (max-width:960px){ .fl.hide-m{ display:none; } }
.flower{ position:absolute; width:170px; inset-inline-start:0; bottom:2%; z-index:4; transform-origin:30% 90%; animation:sway 6s ease-in-out infinite; }
@keyframes sway{ 0%,100%{ transform:rotate(-3deg); } 50%{ transform:rotate(4deg); } }
.loop{ position:absolute; width:190px; inset-inline-end:-3%; bottom:4%; z-index:2; }
.loop path{ fill:none; stroke:var(--amber-d); stroke-width:3; stroke-linecap:round; stroke-dasharray:3 11; animation:dash 3s linear infinite; }
@keyframes dash{ to{ stroke-dashoffset:-56; } }
.ic{ width:22px; height:22px; flex:none; }
.reveal{ opacity:0; transform:translateY(26px); transition:opacity .7s ease, transform .7s ease; }
.reveal.in{ opacity:1; transform:none; }

@media (max-width:960px){
  .hero,.story,.two,.contact{ grid-template-columns:1fr; }
  .prods,.steps{ grid-template-columns:1fr; }
  .uses{ grid-template-columns:1fr 1fr; }
  .links{ display:none; }
  .comb-stage{ min-height:400px; } .comb{ --w:104px; }
  .contact{ padding:30px 22px; }
  .foot-in{ grid-template-columns:1fr; gap:28px; }
}
@media (prefers-reduced-motion:reduce){
  .mn *,.mn *::before,.mn *::after{ animation:none !important; transition:none !important; }
  .reveal{ opacity:1; transform:none; }
}
`;

/* ------------------------------------------------------------------ */
const products = [
  {
    id: "oranger",
    img: "/Miel1.png",
    fr: {
      name: "Miel d'Oranger",
      tag: "Notre signature",
      about:
        "Récolté pendant la floraison des orangers du Cap Bon et du Sahel. C'est un miel clair, doux et très parfumé, le plus délicat de notre gamme.",
      taste: "Floral, agrumes",
      texture: "Fluide, ambrée claire",
      pair: "Thé, lait chaud, yaourt",
      benefits: [
        "Traditionnellement apprécié le soir pour la détente",
        "Doux pour la gorge, dans une tisane tiède",
        "Source d'énergie naturelle, facile à digérer",
      ],
    },
    ar: {
      name: "عسل البرتقال",
      tag: "منتجنا المميز",
      about:
        "يُجنى خلال إزهار أشجار البرتقال. عسل فاتح ولطيف وعطِر، وهو الأنعم في تشكيلتنا.",
      taste: "زهري، حمضيات",
      texture: "سائل، كهرماني فاتح",
      pair: "الشاي، الحليب الدافئ، الياغورت",
      benefits: [
        "يُستعمل تقليدياً في المساء للاسترخاء",
        "لطيف على الحلق مع مشروب دافئ",
        "مصدر طبيعي للطاقة وسهل الهضم",
      ],
    },
  },
  {
    id: "eucalyptus",
    img: "/Miel3.png",
    fr: {
      name: "Miel d'Eucalyptus",
      tag: "Parfait pour l'hiver",
      about:
        "Un miel foncé au caractère affirmé, avec une légère note mentholée qui rappelle la feuille d'eucalyptus. Il se reconnaît à sa couleur ambre profond.",
      taste: "Corsé, légèrement mentholé",
      texture: "Épaisse, brun foncé",
      pair: "Tisane, citron chaud, cuillère",
      benefits: [
        "Réputé pour apaiser la gorge en saison froide",
        "Apprécié pour le confort respiratoire",
        "Riche en antioxydants naturels (miels foncés)",
      ],
    },
    ar: {
      name: "عسل الكاليبتوس",
      tag: "مثالي للشتاء",
      about:
        "عسل داكن بشخصية قوية ونفحة منعشة تذكّر بورق الكاليبتوس، ويتميز بلونه العنبري العميق.",
      taste: "قوي، منعش قليلاً",
      texture: "كثيف، بني داكن",
      pair: "الأعشاب، الليمون الدافئ، بالملعقة",
      benefits: [
        "معروف بتهدئة الحلق في الأجواء الباردة",
        "يُستعمل تقليدياً لراحة التنفس",
        "غني بمضادات الأكسدة الطبيعية",
      ],
    },
  },
  {
    id: "thym",
    img: "/Miel2.png",
    fr: {
      name: "Miel de thym et fleurs de montagne",
      tag: "Le plus aromatique",
      about:
        "Butiné sur le thym et les fleurs sauvages de montagne. Un miel ambré, riche en arômes d'herbes, au goût profond et authentique.",
      taste: "Aromatique, herbacé",
      texture: "Mi-épaisse, ambre cuivré",
      pair: "Fromage, tartines, infusion",
      benefits: [
        "Le thym est traditionnellement digestif et tonique",
        "Apprécié pour donner un coup de fouet en hiver",
        "Riche en arômes et en antioxydants naturels",
      ],
    },
    ar: {
      name: "عسل الزعتر وأزهار الجبل",
      tag: "الأكثر عطراً",
      about:
        "تجنيه النحل من الزعتر والأزهار البرية الجبلية. عسل عنبري غني برائحة الأعشاب وطعمه عميق وأصيل.",
      taste: "عطري، عشبي",
      texture: "متوسط الكثافة، نحاسي",
      pair: "الجبن، الخبز، الأعشاب",
      benefits: [
        "الزعتر معروف تقليدياً بتحسين الهضم والتنشيط",
        "مفيد لمنح الدفء والنشاط في الشتاء",
        "غني بالعطور ومضادات الأكسدة الطبيعية",
      ],
    },
  },
];

const T: Record<Language, any> = {
  fr: {
    nav: [
      ["Produits", "#products"],
      ["Comment le déguster", "#use"],
      ["Notre histoire", "#about"],
      ["Questions", "#faq"],
      ["Contact", "#contact"],
    ],
    eyebrow: "Fait à Chebba, Mahdia",
    variety: "Miel d'Oranger",
    lead: "Du miel tunisien doux et parfumé, préparé en petite quantité. Choisissez votre pot et commandez directement par WhatsApp : nous vous répondons personnellement.",
    order: "Commander sur WhatsApp",
    insta: "Notre Instagram",
    hours: "Lundi au samedi, 9h à 18h",
    pills: [
      "100% naturel",
      "Sans additifs",
      "Origine Tunisie",
      "Livraison soignée",
    ],
    pTitle: "Trois miels, trois caractères",
    pSub: "Chaque miel a son goût et sa texture. Voici de quoi choisir en un coup d'œil.",
    taste: "Goût",
    texture: "Texture",
    pair: "Idéal avec",
    buy: "Commander",
    benefitsT: "Bienfaits traditionnels",
    disclaimer:
      "Les bienfaits mentionnés relèvent de l'usage traditionnel du miel. Ils ne remplacent pas un avis ou un traitement médical.",
    uTitle: "Comment le déguster",
    uSub: "Le miel ne se limite pas à la tartine. Quelques idées simples pour l'utiliser chaque jour.",
    gAlt: "Miel Nairi : miel d'oranger, d'eucalyptus et de thym",
    uses: [
      [
        "🍵",
        "En boisson",
        "Dans un thé ou une tisane. Attendez qu'elle tiédisse pour garder les arômes.",
      ],
      [
        "🥣",
        "Au petit-déjeuner",
        "Sur un yaourt, du pain grillé ou des crêpes.",
      ],
      [
        "🥮",
        "En pâtisserie",
        "Pour sucrer makroud, baklawa, gâteaux et sirops.",
      ],
      ["🧀", "En salé", "Avec du fromage frais, des noix ou une marinade."],
    ],
    aTitle: "Un miel qui vient de chez nous",
    aText:
      "Miel Nairi est une petite marque artisanale de Chebba, à Mahdia. Notre idée est simple : proposer un miel tunisien au goût franc, sans chercher à le transformer, et le livrer proprement emballé.",
    aPoints: [
      "Miel d'oranger, d'eucalyptus et de thym, choisis un par un",
      "Aucun additif, aucun sucre ajouté",
      "Vous parlez directement à la personne qui prépare votre commande",
    ],
    sTitle: "De la ruche à votre table",
    steps: [
      [
        "Choisir",
        "Parcourez les miels ci-dessus et décidez de la variété et du nombre de pots.",
      ],
      [
        "Écrire",
        "Cliquez sur Commander. Votre message est déjà prêt dans WhatsApp, indiquez simplement votre ville.",
      ],
      [
        "Recevoir",
        "Nous confirmons le prix, la livraison et le délai, puis préparons votre colis avec soin.",
      ],
    ],
    nTitle: "Bon à savoir",
    notes: [
      [
        "Le miel cristallise, c'est normal",
        "C'est un signe de miel naturel. Pour le rendre fluide, placez le pot dans de l'eau chaude (sous 40 °C).",
      ],
      [
        "Conservation",
        "À température ambiante, à l'abri de la lumière, pot bien fermé. Pas besoin de réfrigérateur.",
      ],
      ["Moins d'un an", "Ne donnez pas de miel aux bébés de moins de 12 mois."],
    ],
    fTitle: "Questions fréquentes",
    faq: [
      [
        "Comment commander ?",
        "Écrivez-nous sur WhatsApp au +216 24 402 312 en indiquant le miel souhaité, la quantité et votre ville.",
      ],
      [
        "Livrez-vous partout en Tunisie ?",
        "Dites-nous votre ville dans le message : nous confirmons la livraison, le tarif et le délai pour votre adresse.",
      ],
      [
        "Quel miel choisir pour commencer ?",
        "Le miel d'oranger est le plus doux et plaît à presque tout le monde. L'eucalyptus et le thym sont pour ceux qui aiment un goût plus intense.",
      ],
      [
        "Puis-je venir sur place ?",
        "Nous sommes à Chebba, Mahdia, du lundi au samedi de 9h à 18h. Prévenez-nous avant de passer.",
      ],
    ],
    cTitle: "Parlons miel",
    cSub: "Une question, une commande, un cadeau à préparer ? Écrivez-nous.",
    qr: "Scannez ou touchez pour ouvrir notre Instagram",
    address: "Chebba, Mahdia, Tunisie",
    fTag: "Miel artisanal de Chebba, préparé en petite quantité et livré avec soin.",
    fNavT: "Navigation",
    fQrT: "Suivez-nous",
    fQrTxt: "Scannez le code pour nous retrouver sur Instagram.",
    fMade: "Fait avec ❤ à Chebba",
    footer: "Miel Nairi",
    msg: (n: string) =>
      `Bonjour Miel Nairi, je voudrais commander : ${n}. Ma ville : `,
    msgGen: "Bonjour Miel Nairi, je voudrais commander du miel.",
  },
  ar: {
    nav: [
      ["المنتجات", "#products"],
      ["طريقة التذوق", "#use"],
      ["قصتنا", "#about"],
      ["أسئلة", "#faq"],
      ["التواصل", "#contact"],
    ],
    eyebrow: "صُنع في الشبة، المهدية",
    variety: "عسل البرتقال",
    lead: "عسل تونسي ناعم وعطِر، نحضّره بكميات صغيرة. اختر البرطمان الذي يعجبك واطلب مباشرة عبر واتساب، وسنرد عليك شخصياً.",
    order: "اطلب عبر واتساب",
    insta: "صفحتنا على إنستغرام",
    hours: "من الاثنين إلى السبت، 9:00 إلى 18:00",
    pills: ["طبيعي 100%", "بدون إضافات", "من تونس", "توصيل بعناية"],
    pTitle: "ثلاثة أنواع، ثلاث شخصيات",
    pSub: "لكل عسل طعمه وقوامه. هذه مقارنة سريعة تساعدك على الاختيار.",
    taste: "الطعم",
    texture: "القوام",
    pair: "مناسب مع",
    buy: "اطلب",
    benefitsT: "الفوائد التقليدية",
    disclaimer:
      "الفوائد المذكورة مستمدة من الاستعمال التقليدي للعسل ولا تغني عن استشارة أو علاج طبي.",
    uTitle: "كيف تتذوقه؟",
    uSub: "العسل ليس للخبز فقط. بعض الأفكار البسيطة لاستعماله كل يوم.",
    gAlt: "عسل النعيري: عسل البرتقال والكاليبتوس والزعتر",
    uses: [
      [
        "🍵",
        "في المشروبات",
        "أضفه إلى الشاي أو الأعشاب بعد أن تفتر لتحافظ على العطر.",
      ],
      ["🥣", "على الفطور", "مع الياغورت أو الخبز المحمص أو الفطائر."],
      ["🥮", "في الحلويات", "للمقروض والبقلاوة والكعك والشرابات."],
      ["🧀", "مع المالح", "مع الجبن الطازج أو المكسرات أو التتبيلة."],
    ],
    aTitle: "عسل من أرضنا",
    aText:
      "عسل النعيري علامة حرفية صغيرة من الشبة بالمهدية. فكرتنا بسيطة: عسل تونسي بطعم صريح دون أي تحويل، يصلك مغلفاً بعناية.",
    aPoints: [
      "عسل برتقال وكاليبتوس وزعتر، نختاره بأنفسنا",
      "بدون إضافات أو سكر مضاف",
      "تتحدث مباشرة مع من يحضّر طلبك",
    ],
    sTitle: "من الخلية إلى مائدتك",
    steps: [
      ["اختر", "تصفح الأنواع أعلاه وحدد النوع وعدد البرطمانات."],
      [
        "راسلنا",
        "اضغط على اطلب فتفتح رسالة جاهزة في واتساب، أضف فقط اسم مدينتك.",
      ],
      ["استلم", "نؤكد السعر والتوصيل والمدة، ثم نجهز طلبك بعناية."],
    ],
    nTitle: "معلومات مفيدة",
    notes: [
      [
        "التبلور أمر طبيعي",
        "هو علامة على عسل طبيعي. لإعادته سائلاً ضع البرطمان في ماء ساخن (أقل من 40 درجة).",
      ],
      [
        "الحفظ",
        "في حرارة الغرفة بعيداً عن الضوء مع إغلاق البرطمان جيداً. لا حاجة للثلاجة.",
      ],
      ["الرضّع", "لا يُعطى العسل للأطفال دون 12 شهراً."],
    ],
    fTitle: "أسئلة شائعة",
    faq: [
      [
        "كيف أطلب؟",
        "راسلنا على واتساب +216 24 402 312 مع ذكر النوع والكمية ومدينتك.",
      ],
      [
        "هل توصلون إلى كل تونس؟",
        "اذكر مدينتك في الرسالة وسنؤكد لك التوصيل والسعر والمدة.",
      ],
      [
        "ما النوع الذي أبدأ به؟",
        "عسل البرتقال هو الأنعم ويعجب الجميع تقريباً. والكاليبتوس والزعتر لمن يحب طعماً أقوى.",
      ],
      [
        "هل يمكنني الزيارة؟",
        "نحن في الشبة، المهدية، من الاثنين إلى السبت 9:00 - 18:00. أخبرنا قبل المجيء.",
      ],
    ],
    cTitle: "لنتحدث عن العسل",
    cSub: "سؤال أو طلب أو هدية؟ راسلنا.",
    qr: "امسح الرمز أو المسه لفتح صفحتنا على إنستغرام",
    address: "الشبة، المهدية، تونس",
    fTag: "عسل حرفي من الشبة، نحضّره بكميات صغيرة ونوصله بعناية.",
    fNavT: "التنقل",
    fQrT: "تابعنا",
    fQrTxt: "امسح الرمز لتجدنا على إنستغرام.",
    fMade: "صُنع بحب في الشبة",
    footer: "عسل النعيري",
    msg: (n: string) => `مرحبا عسل النعيري، أريد أن أطلب: ${n}. مدينتي: `,
    msgGen: "مرحبا عسل النعيري، أريد أن أطلب عسلاً.",
  },
};

const ICONS: Record<string, JSX.Element> = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6.1 6.1l1.4-1.4a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z" />
  ),
  pin: (
    <>
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6" />,
  insta: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </>
  ),
  wa: (
    <path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.6L3 21zm6-12c0 3 3 6 6 6l1.5-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 9z" />
  ),
};
const Icon = ({ n }: { n: string }) => (
  <svg
    className="ic"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICONS[n]}
  </svg>
);

const TunisiaFlag = () => (
  <svg viewBox="0 0 100 100" aria-label="Tunisie">
    <circle cx="50" cy="50" r="50" fill="#e70013" />
    <circle cx="50" cy="50" r="27" fill="#fff" />
    <circle cx="50" cy="50" r="19" fill="#e70013" />
    <circle cx="55" cy="50" r="15" fill="#fff" />
    <path
      d="M56 41l3 7 7 .5-5.5 4.5 2 7-6.5-4-6.5 4 2-7L45 48.5l7-.5z"
      fill="#e70013"
    />
  </svg>
);

const Floater = ({
  x,
  y,
  s = 36,
  dur = 7,
  dl = 0,
  f = 1,
  hide = false,
}: {
  x: string;
  y: string;
  s?: number;
  dur?: number;
  dl?: number;
  f?: number;
  hide?: boolean;
}) => (
  <span
    className={`fl${hide ? " hide-m" : ""}`}
    aria-hidden="true"
    style={{
      ["--x" as any]: x,
      ["--y" as any]: y,
      ["--s" as any]: `${s}px`,
      ["--dur" as any]: `${dur}s`,
      ["--dl" as any]: `${dl}s`,
      ["--f" as any]: f,
    }}
  >
    <img src="/bee1.png" alt="" />
  </span>
);

const Flower = () => (
  <svg className="flower" viewBox="0 0 170 160" aria-hidden="true">
    <path d="M14 66C34 44 72 52 84 86C56 98 26 92 14 66Z" fill="#7d9b3b" />
    <path
      d="M58 142C66 108 102 100 122 112C116 138 90 152 58 142Z"
      fill="#6c8a2f"
    />
    <g
      transform="translate(88 82)"
      fill="#fffaf0"
      stroke="#e8b04a"
      strokeWidth="2.5"
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="0"
          cy="-28"
          rx="18"
          ry="30"
          transform={`rotate(${r})`}
        />
      ))}
      <circle r="11" fill="#fcb830" stroke="none" />
      <g stroke="#e8921a" strokeWidth="2" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <line
            key={r}
            x1="0"
            y1="-6"
            x2="0"
            y2="-19"
            transform={`rotate(${r})`}
          />
        ))}
      </g>
    </g>
  </svg>
);

const Swoosh = () => (
  <svg className="swoosh" viewBox="0 0 460 80" aria-hidden="true">
    <defs>
      <linearGradient id="hg" x1="0" x2="1">
        <stop offset="0" stopColor="#e8921a" />
        <stop offset=".5" stopColor="#fcb830" />
        <stop offset="1" stopColor="#ffd77a" />
      </linearGradient>
    </defs>
    <path
      className="body"
      fill="url(#hg)"
      d="M4 14C70 46 170 52 270 38C340 28 400 20 456 24C410 36 360 44 300 52C190 68 70 62 4 14Z"
    />
    <path className="dr" fill="#fcb830" d="M236 50V62A9 9 0 1 0 254 62V48Z" />
  </svg>
);

const Splash = () => (
  <svg className="splash" viewBox="0 0 90 60" aria-hidden="true">
    <path fill="#fcb830" d="M4 40C16 28 30 34 36 42C26 46 14 48 4 40Z" />
    <path fill="#fcb830" d="M50 4C60 14 58 30 52 40C46 30 44 16 50 4Z" />
  </svg>
);

const HEX = [
  "#ffc05a",
  "#f0a02a",
  "#ffd88c",
  "#d97f10",
  "#ffc05a",
  "#e8921a",
  "#ffb84a",
];

const BusinessWebsite = () => {
  const [lang, setLang] = useState<Language>("fr");
  const t = T[lang];
  const rtl = lang === "ar";

  useEffect(() => {
    const els = document.querySelectorAll(".mn .reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  let hexIndex = 0;
  const hexRow = (n: number) => (
    <div className="r">
      {Array.from({ length: n }).map(() => {
        const i = hexIndex++;
        return (
          <div
            key={i}
            className="hex"
            style={{ ["--c" as any]: HEX[i], ["--i" as any]: i }}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="mn" dir={rtl ? "rtl" : "ltr"} id="top">
        {/* flying bees */}
        <div
          className="fly"
          style={{
            ["--s" as any]: "64px",
            ["--t" as any]: "26%",
            ["--dur" as any]: "26s",
            ["--dl" as any]: "1.5s",
          }}
          aria-hidden="true"
        >
          <img src="/bee1.png" alt="" />
        </div>
        <div
          className="fly"
          style={{
            ["--s" as any]: "44px",
            ["--t" as any]: "60%",
            ["--dur" as any]: "34s",
            ["--dl" as any]: "9s",
          }}
          aria-hidden="true"
        >
          <img src="/bee1.png" alt="" />
        </div>

        <header className="nav">
          <div className="wrap">
            <a className="logo" href="#top">
              <img src="/logo.png" alt="Miel Nairi" />
            </a>
            <nav className="links" aria-label="Navigation">
              {t.nav.map(([l, h]: string[]) => (
                <a key={h} href={h}>
                  {l}
                </a>
              ))}
            </nav>
            <div className="lang" role="group" aria-label="Langue">
              {(["fr", "ar"] as Language[]).map((o) => (
                <button
                  key={o}
                  className={o === lang ? "on" : ""}
                  onClick={() => setLang(o)}
                >
                  {o === "fr" ? "Français" : "العربية"}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main>
          {/* HERO */}
          <div className="wrap hero">
            {/* bees floating at the top */}
            <Floater x="38%" y="10px" s={38} dur={7} />
            <Floater x="62%" y="40px" s={28} dur={9} dl={1} f={-1} />
            <Floater x="8%" y="30px" s={30} dur={8} dl={2} hide />
            <Floater x="92%" y="12px" s={34} dur={6.5} dl={0.5} f={-1} hide />

            <div>
              <span className="pill">
                <Icon n="pin" /> {t.eyebrow}
              </span>
              <div className="title">
                <Splash />
                <h1>
                  {rtl ? (
                    "عسل النعيري"
                  ) : (
                    <>
                      <span>Miel Nairi</span>
                    </>
                  )}
                </h1>
              </div>
              <Swoosh />
              <p className="lead">{t.lead}</p>
              <div className="row">
                <a
                  className="btn fill"
                  href={wa(t.msgGen)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon n="wa" /> {t.order}
                </a>
                <a
                  className="btn line"
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon n="insta" /> {t.insta}
                </a>
              </div>
              <div className="facts">
                <a href="tel:+21697364230">
                  <span>
                    <span className="ic">
                      <Icon n="phone" />
                    </span>{" "}
                    97 364 230
                  </span>
                </a>
                <span>
                  <span className="ic">
                    <Icon n="pin" />
                  </span>{" "}
                  {rtl ? "الشبة – المهدية" : "Chebba – Mahdia"}
                </span>
                <span>
                  <span className="ic">
                    <Icon n="clock" />
                  </span>{" "}
                  {t.hours}
                </span>
              </div>
            </div>

            <div className="comb-stage" aria-hidden="true">
              <div className="flag">
                <TunisiaFlag />
              </div>
              <div className="comb">
                {hexRow(2)}
                {hexRow(3)}
                {hexRow(2)}
              </div>
              <img className="mascot" src="/bee2.png" alt="" />
              <Flower />
              <svg className="loop" viewBox="0 0 200 140">
                <path d="M10 120C60 130 110 110 120 80C130 40 100 20 80 40C60 60 100 100 150 90C185 82 192 40 180 10" />
              </svg>
            </div>
          </div>

          <div className="band">
            <div className="wrap" style={{ paddingBlock: 22 }}>
              <div className="pills">
                {t.pills.map((p: string) => (
                  <span key={p}>
                    <Icon n="check" /> {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <section className="sec wrap" id="products">
            <Floater x="82%" y="30px" s={40} dur={8} />
            <Floater x="-2%" y="55%" s={28} dur={6} dl={1} f={-1} hide />
            <h2 className="reveal">{t.pTitle}</h2>
            <p className="sub reveal">{t.pSub}</p>
            <div className="prods">
              {products.map((p) => {
                const c = p[lang];
                return (
                  <article key={p.id} className="prod reveal">
                    <span className="tag">{c.tag}</span>
                    <img
                      className="photo"
                      src={p.img}
                      alt={c.name}
                      loading="lazy"
                    />
                    <h3>{c.name}</h3>
                    <p className="about">{c.about}</p>
                    <dl>
                      <div>
                        <dt>{t.taste}</dt>
                        <dd>{c.taste}</dd>
                      </div>
                      <div>
                        <dt>{t.texture}</dt>
                        <dd>{c.texture}</dd>
                      </div>
                      <div>
                        <dt>{t.pair}</dt>
                        <dd>{c.pair}</dd>
                      </div>
                    </dl>
                    <h4>{t.benefitsT}</h4>
                    <ul>
                      {c.benefits.map((b: string) => (
                        <li key={b}>
                          <Icon n="check" /> {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="btn fill"
                      href={wa(t.msg(c.name))}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon n="wa" /> {t.buy}
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="disclaimer reveal">{t.disclaimer}</p>
          </section>

          {/* USE */}
          <div className="band">
            <section className="sec wrap" id="use">
              <Floater x="90%" y="40px" s={34} dur={7} dl={0.5} f={-1} />
              <Floater x="45%" y="85%" s={26} dur={9} hide />
              <h2 className="reveal">{t.uTitle}</h2>
              <p className="sub reveal">{t.uSub}</p>
              <div className="uses">
                {t.uses.map(([e, h, d]: string[], i: number) => (
                  <div
                    key={h}
                    className="use reveal"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div
                      className="hex"
                      style={{
                        ["--c" as any]: HEX[(i * 2) % 7],
                        ["--i" as any]: 0,
                      }}
                    >
                      {e}
                    </div>
                    <h3>{h}</h3>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* STORY */}
          <section className="sec wrap" id="about">
            <Floater x="48%" y="10%" s={32} dur={8} dl={2} />
            <Floater x="92%" y="75%" s={38} dur={6.5} f={-1} hide />
            <div className="story">
              {/* <div className="art reveal" aria-hidden="true">
                <div className="blob" />
                <img src="/bee2.png" alt="" />
              </div> */}
              <div className="gallery reveal">
                <img src="/Miels.png" alt={t.gAlt} loading="lazy" />
              </div>
              <div className="reveal">
                <h2>{t.aTitle}</h2>
                <p className="sub" style={{ marginBottom: 0 }}>
                  {t.aText}
                </p>
                <div className="points">
                  {t.aPoints.map((p: string) => (
                    <div key={p}>
                      <span className="ic">
                        <Icon n="check" />
                      </span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <div className="band">
            <section className="sec wrap">
              <Floater x="70%" y="30px" s={34} dur={7} dl={1} />
              <Floater x="3%" y="70%" s={26} dur={8} f={-1} hide />
              <h2 className="reveal">{t.sTitle}</h2>
              <div className="steps" style={{ marginTop: 30 }}>
                {t.steps.map(([h, d]: string[], i: number) => (
                  <div
                    key={h}
                    className="step reveal"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="n">{i + 1}</div>
                    <h3>{h}</h3>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* NOTES + FAQ */}
          <section className="sec wrap" id="faq">
            <Floater x="50%" y="20px" s={30} dur={7.5} />
            <Floater x="95%" y="60%" s={26} dur={9} dl={1.5} f={-1} hide />
            <div className="two">
              <div className="reveal">
                <h2>{t.nTitle}</h2>
                <div className="notes" style={{ marginTop: 24 }}>
                  {t.notes.map(([h, d]: string[]) => (
                    <div key={h} className="note">
                      <div>
                        <b>{h}</b>
                        <span>{d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal">
                <h2>{t.fTitle}</h2>
                <div style={{ marginTop: 24 }}>
                  {t.faq.map(([q, a]: string[]) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="foot">
          <div className="wrap foot-in">
            <div className="foot-brand">
              <img src="/logo.png" alt="Miel Nairi" />
              <p>{t.fTag}</p>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <Icon n="insta" /> {t.insta}
              </a>
            </div>

            <div>
              <h4>{t.fNavT}</h4>
              <nav>
                {t.nav.map(([l, h]: string[]) => (
                  <a key={h} href={h}>
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4>{t.cTitle}</h4>
              <div className="fcol">
                <a href="tel:+21697364230">
                  <Icon n="phone" /> 97 364 230
                </a>
                <a href={wa(t.msgGen)} target="_blank" rel="noreferrer">
                  <Icon n="wa" /> WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=Chebba%20Mahdia%20Tunisie"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon n="pin" /> {t.address}
                </a>
                <span
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                  <Icon n="clock" /> {t.hours}
                </span>
              </div>
            </div>

            <div className="foot-qr">
              <h4>{t.fQrT}</h4>
              <a
                className="qrbox"
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/qrcode.png"
                  alt="QR code Instagram Miel Nairi"
                  width={130}
                  height={130}
                  loading="lazy"
                />
              </a>
              <small>{t.fQrTxt}</small>
            </div>
          </div>
          <div className="foot-bottom">
            © {new Date().getFullYear()} {t.footer} · {t.fMade} ·{" "}
            <a href="#top" aria-label="Top">
              ↑
            </a>
          </div>
        </footer>

        <a
          className="fab"
          href={wa(t.msgGen)}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <Icon n="wa" />
        </a>
      </div>
    </>
  );
};

export default BusinessWebsite;
