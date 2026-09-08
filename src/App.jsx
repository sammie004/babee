import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ALLOWED_NAMES = ["moyin", "moyinoluwa", "mrs ndih", "elizabeth", "bubba"];

const POPUP_MESSAGES = [
  "hmm, that's not it. try again 👀",
  "IMPOSTOR DETECTED 🚨 nice try though",
  "okay who is this. give the phone back to her 📵",
  "yeah... you're definitely not her 😭",
  "who sent you 💀",
  "nice attempt, impostor",
  "the audacity 😭 try again",
  "sir/ma'am, this is not your account",
  "identity crisis detected 🚨",
  "that's not very convincing ngl",
  "bro thought we'd fall for that 💀",
  "nice try FBI agent",
  "access denied. respectfully.",
  "hmm... suspicious behavior detected 👀",
  "we're gonna need some ID for that",
  "you really thought that would work 😭",
  "WHO ARE YOU 🧍",
  "this ain't adding up chief",
  "something is VERY off here",
  "caught in 4K 📸",
  "the real her would know this 😭",
  "yeah no, try again",
  "impostor activities detected",
  "nice disguise though",
  "close... but not close enough",
  "you almost had me 💀",
  "respectfully, you're not her",
  "wrong person, wrong answers",
  "identity verification: FAILED ❌",
  "hacker detected. just kidding... unless? 👀",
  "who let you in 😭",
  "security has been notified 🚨",
  "bro is NOT beating the allegations",
  "the vibes are suspicious",
  "something smells like impostor 💀",
  "I know you ain't her",
  "you have failed the vibe check",
  "authentication unsuccessful 😭",
  "nice try, secret agent",
  "we can do this all day",
  "you're getting warmer... actually no",
  "that answer was criminal 💀",
  "the real one would NEVER",
  "absolutely diabolical attempt",
  "who gave you access 😭",
  "this feels illegal somehow",
  "permission to impersonate: DENIED",
  "you cannot simply become her 💀",
  "identity theft is not a joke 😭",
  "bro really said 'trust me' 💀",
  "I have questions. MANY questions.",
  "that's gonna be a no from me",
  "not buying it 👀",
  "the math ain't mathing",
  "we need to talk about these answers",
  "suspicious. extremely suspicious.",
  "nice try, but I have receipts 🧾",
  "the impostor is getting desperate 😭",
  "you've been exposed 🚨",
  "caught lacking",
  "case closed. you're not her.",
  "ACCESS DENIED 🔒",
  "authentication failed successfully 💀",
  "try again before I call the authorities 😭",
  "you really woke up and chose impostor behavior",
  "this is getting embarrassing for you",
  "I can do this all day. can you?",
  "one of us knows her. it isn't you.",
  "you thought you could fool me 😭",
  "nice performance. terrible accuracy.",
  "the real her is somewhere laughing rn",
  "you're not even close 💀",
  "I'm starting to think you're a stranger",
  "identity check said: absolutely not",
  "we've seen enough 😭",
  "pack it up, impostor",
  "mission failed. try again.",
  "you have been respectfully rejected 🫡",
  "the security team is disappointed",
  "bro failed the friendship exam 💀",
  "how do you NOT know this 😭",
  "that's your final answer?!",
  "I expected better from you",
  "you had ONE job 💀",
  "this is not looking good for you",
  "the allegations are looking pretty strong",
  "I smell an impostor 👀",
  "you are on VERY thin ice",
  "okay, now you're just guessing 😭",
  "random answer detected",
  "the confidence is impressive. the accuracy isn't.",
  "you can't bluff your way out of this",
  "nice try, stranger",
  "her phone. her account. NOT YOU.",
  "security question said: who even are you?",
  "this interrogation is going terribly for you 💀",
  "I'm gonna pretend I didn't see that",
  "let's try that again, impostor",
  "you've been exposed in 4K ultra HD 📸",
  "final warning 🚨",
  "okay impostor, calm down",
  "the real one is crying somewhere 😭",
  "I have officially lost faith in you 💀",
  "bro forgot who he was impersonating",
  "not beating the impostor allegations",
  "you are NOT her 😭",
  "go find the actual owner of this phone",
  "nice try though. genuinely.",
  "alright, who's behind the keyboard?",
  "the disguise is not disguising",
  "we're onto you 👀",
  "you've activated suspicious mode",
  "that was painfully incorrect",
  "try again before things get awkward 💀"
];

const CHAT_LINES = [
  "hey",
  "remember this?",
  "the day i first texted you on whatsapp",
  "i had no idea it would turn into this",
];

const REASONS = [
  {
    title: "the way you say \u201cSAMUEL\u201d when you're annoyed",
    body: "and mean it anyway. that's when I know I'm actually in trouble \u2014 and somehow I still smile.",
  },
  {
    title: "an ordinary tuesday, with you texting me",
    body: "somehow feels lighter than most good days. I don't fully understand how you do that.",
  },
  {
    title: "you make it easy to just be myself",
    body: "the unfiltered, unimpressive, still-figuring-it-out parts included. no performance required.",
  },
  {
    title: "you remember the tiny things",
    body: "the thing I mentioned once, weeks ago, half-asleep. you bring it back up like it mattered. it did.",
  },
  {
    title: "you stayed. after everything, you stayed.",
    body: "that's not a small thing to me. I don't think I'll ever fully say thank you enough for that.",
  },
  {
    title: "you're achalugo to me",
    body: "it's the name I reach for when \u201cI like you a lot\u201d stops being enough.",
  },
];
const DODGE_TAUNTS = [
  "nuh uh",
  "not today",
  "try again",
  "so close tho",
  "almost had it",
  "nope",
  "yeah no",
  "nice try",
  "uhhh no",
  "wrong move",
  "not quite",
  "you wish",
  "keep dreaming",
  "good effort",
  "close one",
  "missed me",
  "too slow",
  "maybe next time",
  "hard pass",
  "absolutely not",
  "denied",
  "blocked",
  "no shot",
  "think again",
  "better luck next time",
  "that's cute",
  "nice attempt",
  "you tried",
  "not happening",
  "try harder",
  "almost 😭",
  "erm... no",
  "respectfully, no",
  "i'll pass",
  "caught in 4K",
  "nice try though",
  "whoops",
  "nope nope nope",
  "incorrect 💀",
  "not this time",
  "you almost cooked",
  "and yet... no",
  "better luck, champ",
  "denied with love",
  "absolutely cooked",
  "mission failed",
  "close but no",
  "keep swinging",
  "that's gonna be a no",

  // New additions
  "bro missed",
  "swing and a miss",
  "you gotta do better",
  "skill issue",
  "major skill issue",
  "lagging?",
  "is your ping okay?",
  "bro aimed with his eyes closed",
  "whiffed it",
  "can't touch this",
  "too easy",
  "predictable",
  "i saw that coming",
  "read you like a book",
  "nice pattern",
  "same move again?",
  "is that all?",
  "boring",
  "you can do better than that",
  "seriously?",
  "that's your plan?",
  "good joke",
  "next",
  "keep em coming",
  "weak",
  "that was adorable",
  "cute attack",
  "pathetic",
  "embarrassing",
  "awkward...",
  "you good?",
  "blink and you missed",
  "still missed",
  "and miss",
  "try aiming",
  "have you considered aiming?",
  "brother ewww",
  "not even close",
  "distance: maintained",
  "access denied",
  "permission denied",
  "request rejected",
  "error 404: hit not found",
  "error 403: forbidden",
  "attack failed successfully",
  "task failed successfully",
  "invalid target",
  "outplayed",
  "countered",
  "anticipated",
  "expected",
  "calculated",
  "too obvious",
  "nice telegraph",
  "saw it a mile away",
  "that move is getting old",
  "running out of ideas?",
  "you're repeating yourself",
  "yawn",
  "zzz",
  "wake me up when it lands",
  "still waiting",
  "any day now",
  "you'll get one eventually",
  "keep believing",
  "faith is important",
  "manifesting a hit?",
  "delusion detected",
  "confidence exceeded accuracy",
  "you had one job",
  "tragic",
  "painful to watch",
  "that hurt me emotionally",
  "not the best look",
  "unfortunate",
  "deeply unfortunate",
  "catastrophic miss",
  "historic fumble",
  "generational miss",
  "hall of fame miss",
  "world record miss",
  "spectacular failure",
  "incredible whiff",
  "masterclass in missing",
  "10/10 dodge",
  "too clean",
  "silky smooth",
  "effortless",
  "untouchable",
  "built different",
  "simply better",
  "elite footwork",
  "god-tier dodge",
  "you can't catch me",
  "catch me first",
  "try sprinting",
  "need a map?",
  "over here",
  "wrong direction",
  "warmer...",
  "colder...",
  "free tip: aim better",
  "you've got heart",
  "not enough accuracy though",
  "keep practicing",
  "training arc needed",
  "back to the tutorial",
  "tutorial boss wins again",
  "NPC behavior",
  "rookie mistake",
  "amateur hour",
  "bronze rank behavior",
  "silver energy",
  "not beating the allegations",
  "another one",
  "and another miss",
  "queue the sad music",
  "that's rough buddy",
  "better luck in the next patch",
  "balance issue? nope",
  "working as intended",
  "get juked",
  "sit down",
  "stay humble",
  "hold that L",
  "L acquired",
  "L secured",
  "L collected",
  "freshly delivered L",
  "premium grade L",
  "deluxe edition miss",
  "legendary whiff unlocked"
];
const FINAL_LINES = ["I love you,", "today,", "tomorrow,", "and always."];

function useFloatingHearts(count = 14) {
  const [hearts] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 16,
      opacity: 0.12 + Math.random() * 0.22,
    }))
  );
  return hearts;
}

export default function LoveSite() {
  const [unlocked, setUnlocked] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [popup, setPopup] = useState(null);
  const [shakeInput, setShakeInput] = useState(false);
  const popupTimer = useRef(null);
  const [welcomePopup, setWelcomePopup] = useState(false);
  const welcomeTimer = useRef(null);

  const [lineIndex, setLineIndex] = useState(0);
  const [heroDone, setHeroDone] = useState(false);
  const [openReason, setOpenReason] = useState(null);
  const [bursts, setBursts] = useState([]);
  const burstId = useRef(0);
  const floatingHearts = useFloatingHearts();

  // door prank state
  const [showChoice, setShowChoice] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [yesPos, setYesPos] = useState({ x: 190, y: 40 });
  const yesContainerRef = useRef(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalLineIndex, setFinalLineIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  // content only mounts after unlock — AOS needs to re-scan for new elements
  useEffect(() => {
    if (unlocked) {
      AOS.refresh();
    }
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    if (lineIndex >= CHAT_LINES.length) {
      const t = setTimeout(() => setHeroDone(true), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 1100);
    return () => clearTimeout(t);
  }, [unlocked, lineIndex]);

  useEffect(() => {
    if (!showFinalMessage) return;
    if (finalLineIndex >= FINAL_LINES.length) return;
    const t = setTimeout(() => setFinalLineIndex((i) => i + 1), 650);
    return () => clearTimeout(t);
  }, [showFinalMessage, finalLineIndex]);

  const handleUnlock = (e) => {
    e.preventDefault();
    const val = nameInput.trim().toLowerCase();
    if (ALLOWED_NAMES.includes(val)) {
      setUnlocked(true);
      setWelcomePopup(true);
      if (welcomeTimer.current) clearTimeout(welcomeTimer.current);
      welcomeTimer.current = setTimeout(() => setWelcomePopup(false), 2200);
      return;
    }
    const nextAttempt = attempt + 1;
    setAttempt(nextAttempt);
    const msg = POPUP_MESSAGES[Math.min(nextAttempt - 1, POPUP_MESSAGES.length - 1)];
    setPopup(msg);
    setShakeInput(true);
    setTimeout(() => setShakeInput(false), 500);
    if (popupTimer.current) clearTimeout(popupTimer.current);
    popupTimer.current = setTimeout(() => setPopup(null), 1900);
  };

  const spawnBurst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const newBursts = Array.from({ length: 10 }, () => ({
      id: burstId.current++,
      x: originX + (Math.random() - 0.5) * 40,
      y: originY,
      dx: (Math.random() - 0.5) * 160,
      rotate: (Math.random() - 0.5) * 60,
      emoji: ["\u2764\ufe0f", "\ud83e\udde1", "\ud83d\udc9b", "\u2728"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setBursts((b) => [...b, ...newBursts]);
    setTimeout(() => {
      setBursts((b) => b.filter((p) => !newBursts.find((n) => n.id === p.id)));
    }, 1400);
  };

  const moveYesButton = () => {
    const container = yesContainerRef.current?.getBoundingClientRect();
    if (!container) return;
    const btnWidth = 100;
    const btnHeight = 42;
    const maxX = Math.max(container.width - btnWidth, 0);
    const maxY = Math.max(container.height - btnHeight, 0);
    setYesPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    setDodgeCount((c) => c + 1);
  };

  const handleNo = () => {
    setDoorOpen(true);
    setTimeout(() => setShowPopup(true), 550);
  };

  const handleOkay = () => {
    setShowPopup(false);
    setShowFinalMessage(true);
  };

  const resetDoor = () => {
    setShowPopup(false);
    setDoorOpen(false);
    setShowChoice(false);
    setDodgeCount(0);
    setYesPos({ x: 190, y: 40 });
    setShowFinalMessage(false);
    setFinalLineIndex(0);
  };

  return (
    <div className="wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Quicksand:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        .wrap {
          --bg: #1B0F14;
          --bg2: #2A1620;
          --gold: #D8A657;
          --rose: #E98AA0;
          --cream: #F6ECDF;
          --muted: #C9A9B0;
          background: var(--bg);
          color: var(--cream);
          font-family: 'Quicksand', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .serif { font-family: 'Cormorant Garamond', serif; }

        .bg-hearts {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .bg-heart {
          position: absolute;
          bottom: -40px;
          color: var(--rose);
          animation-name: floatUp;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-52vh) translateX(12px) rotate(8deg); }
          100% { transform: translateY(-105vh) translateX(-8px) rotate(-6deg); }
        }

        section { position: relative; z-index: 1; }

        /* LOCK SCREEN */
        .lock-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          z-index: 2;
        }

        .lock-card {
          background: var(--bg2);
          border: 1px solid rgba(216,166,87,0.25);
          border-radius: 20px;
          padding: 40px 30px;
          max-width: 360px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
        }

        .bouncer-eyes {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 16px;
        }

        .eye {
          width: 34px;
          height: 34px;
          background: var(--cream);
          border-radius: 50%;
          position: relative;
          box-shadow: inset 0 0 0 2px rgba(27,15,20,0.25), 0 3px 8px rgba(0,0,0,0.3);
        }

        .pupil {
          width: 13px;
          height: 13px;
          background: #1B0F14;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: lookAround 2.8s ease-in-out infinite;
        }

        @keyframes lookAround {
          0%, 8%   { transform: translate(-50%, -50%) translateX(0); }
          22%      { transform: translate(-50%, -50%) translateX(-9px); }
          40%      { transform: translate(-50%, -50%) translateX(-9px); }
          52%      { transform: translate(-50%, -50%) translateX(9px); }
          70%      { transform: translate(-50%, -50%) translateX(9px); }
          85%, 100% { transform: translate(-50%, -50%) translateX(0); }
        }

        .lock-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          margin: 0 0 8px 0;
          color: var(--cream);
        }

        .lock-sub {
          color: var(--muted);
          font-size: 14px;
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .lock-input-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lock-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(216,166,87,0.3);
          border-radius: 12px;
          padding: 13px 16px;
          color: var(--cream);
          font-family: 'Quicksand', sans-serif;
          font-size: 15px;
          outline: none;
          text-align: center;
          transition: border-color 0.2s ease;
        }

        .lock-input:focus {
          border-color: var(--gold);
        }

        .lock-input.shake {
          animation: shakeField 0.45s ease;
          border-color: var(--rose);
        }

        @keyframes shakeField {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }

        .lock-btn {
          background: var(--gold);
          color: #1B0F14;
          border: none;
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .lock-btn:hover { transform: translateY(-1px); }
        .lock-btn:active { transform: scale(0.97); }

        .lock-attempts {
          margin-top: 16px;
          font-size: 12px;
          color: var(--muted);
          opacity: 0.7;
        }

        .imposter-popup {
          position: fixed;
          top: 20%;
          left: 50%;
          z-index: 100;
          background: var(--rose);
          color: #1B0F14;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 22px;
          border-radius: 14px;
          box-shadow: 0 12px 34px rgba(0,0,0,0.45);
          animation: popupIn 0.5s cubic-bezier(.34,1.56,.64,1) forwards;
          max-width: 280px;
          text-align: center;
        }

        @keyframes popupIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-10deg); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }

        .welcome-popup {
          position: fixed;
          top: 20%;
          left: 50%;
          z-index: 100;
          background: var(--gold);
          color: #1B0F14;
          font-weight: 700;
          font-size: 17px;
          font-family: 'Quicksand', sans-serif;
          padding: 16px 26px;
          border-radius: 999px;
          box-shadow: 0 12px 34px rgba(0,0,0,0.45);
          animation: popupIn 0.5s cubic-bezier(.34,1.56,.64,1) forwards, welcomeBob 1.6s ease-in-out 0.5s infinite;
          text-align: center;
          white-space: nowrap;
        }

        @keyframes welcomeBob {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.06); }
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          text-align: center;
        }

        .chatbox {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 180px;
          justify-content: flex-end;
          width: 100%;
          max-width: 380px;
        }

        .bubble {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--rose), #c96d85);
          color: #1B0F14;
          padding: 10px 16px;
          border-radius: 18px 18px 4px 18px;
          font-size: 15px;
          font-weight: 600;
          max-width: 80%;
          margin-left: auto;
          opacity: 0;
          animation: popIn 0.5s ease forwards;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }

        @keyframes popIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-reveal {
          margin-top: 40px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .hero-reveal.show { opacity: 1; transform: translateY(0); }

        .kicker {
          letter-spacing: 0.04em;
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 14px;
        }

        .sparkle {
          display: inline-block;
          animation: sparkleSpin 3.5s linear infinite;
        }

        @keyframes sparkleSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        h1.title {
          font-size: clamp(40px, 9vw, 76px);
          font-weight: 500;
          line-height: 1.05;
          margin: 0 0 10px 0;
          color: var(--cream);
        }

        .nicknames {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--gold);
          font-size: clamp(18px, 3vw, 22px);
          margin-bottom: 18px;
        }

        .pulse-heart {
          display: inline-block;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .tagline {
          color: var(--muted);
          font-size: 16px;
          max-width: 360px;
          margin: 0 auto;
        }

        .scroll-cue {
          margin-top: 46px;
          font-size: 13px;
          color: var(--muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .scroll-cue span { animation: bob 2s ease-in-out infinite; }

        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* SECTIONS */
        .content {
          max-width: 620px;
          margin: 0 auto;
          padding: 90px 24px;
        }

        .label {
          font-size: 13px;
          color: var(--rose);
          margin-bottom: 8px;
          font-weight: 600;
        }

        h2.section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 5vw, 44px);
          font-weight: 500;
          margin: 0 0 20px 0;
          color: var(--cream);
        }

        p.body-text {
          font-size: 17px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 60ch;
        }

        .content.heavy {
          background: linear-gradient(180deg, transparent, rgba(216,166,87,0.05), transparent);
        }

        .content.heavy p.body-text {
          color: #DDC3C9;
        }

        .divider {
          width: 46px;
          height: 1px;
          background: var(--gold);
          margin: 60px auto;
          opacity: 0.5;
        }

        /* REASONS LIST */
        .reasons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }

        .reason-card {
          background: var(--bg2);
          border: 1px solid rgba(216,166,87,0.18);
          border-radius: 14px;
          padding: 18px 20px;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .reason-card:hover { border-color: rgba(216,166,87,0.45); }

        .reason-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .reason-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-style: italic;
          color: var(--cream);
        }

        .reason-plus {
          color: var(--gold);
          font-size: 20px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .reason-plus.open { transform: rotate(45deg); }

        .reason-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease, padding-top 0.35s ease;
        }

        .reason-body.open { max-height: 200px; padding-top: 12px; }

        .reason-body p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        /* FINALE */
        .finale {
          text-align: center;
          padding: 100px 24px 60px;
        }

        .finale h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 500;
          max-width: 500px;
          margin: 0 auto 14px;
          line-height: 1.25;
        }

        .finale .sub-finale {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(17px, 2.6vw, 21px);
          color: var(--muted);
          max-width: 420px;
          margin: 0 auto 36px;
          line-height: 1.5;
        }

        .love-btn {
          background: var(--gold);
          color: #1B0F14;
          border: none;
          border-radius: 999px;
          padding: 14px 30px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 6px 20px rgba(216,166,87,0.25);
        }

        .love-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(216,166,87,0.35);
        }

        .love-btn:active { transform: translateY(0px) scale(0.97); }

        .footer-note {
          margin-top: 30px;
          font-size: 13px;
          color: var(--muted);
          opacity: 0.7;
        }

        .burst-particle {
          position: fixed;
          z-index: 50;
          pointer-events: none;
          font-size: 20px;
          animation: burstRise 1.3s ease-out forwards;
        }

        @keyframes burstRise {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), -140px) rotate(var(--rot)) scale(0.7); }
        }

        /* DOOR PRANK */
        .door-zone {
          text-align: center;
          padding-top: 20px;
          padding-bottom: 130px;
        }

        .door-frame {
          position: relative;
          width: 130px;
          height: 190px;
          margin: 26px auto 6px;
          perspective: 900px;
        }

        .door {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #7a4a55, #5c333c);
          border: 3px solid var(--gold);
          border-radius: 8px 8px 4px 4px;
          position: relative;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 0.7s ease;
          box-shadow: 0 12px 30px rgba(0,0,0,0.45);
        }

        .door.open { transform: rotateY(-112deg); }

        .door-knob {
          position: absolute;
          right: 12px;
          top: 50%;
          width: 10px;
          height: 10px;
          background: var(--gold);
          border-radius: 50%;
          transform: translateY(-50%);
        }

        .door-popup {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -55%);
          background: var(--bg2);
          border: 1px solid var(--gold);
          border-radius: 16px;
          padding: 18px 22px;
          width: 210px;
          text-align: center;
          z-index: 5;
          box-shadow: 0 16px 44px rgba(0,0,0,0.5);
          animation: popupPop 0.45s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        @keyframes popupPop {
          0% { opacity: 0; transform: translate(-50%, -35%) scale(0.5); }
          100% { opacity: 1; transform: translate(-50%, -55%) scale(1); }
        }

        .laugh-emoji {
          font-size: 38px;
          display: inline-block;
          animation: laughBounce 0.6s ease-in-out infinite;
        }

        @keyframes laughBounce {
          0%, 100% { transform: rotate(-8deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.15); }
        }

        .door-popup-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 18px;
          color: var(--cream);
          margin: 8px 0 14px;
        }

        .door-popup-close {
          background: var(--gold);
          color: #1B0F14;
          border: none;
          border-radius: 999px;
          padding: 8px 18px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }

        .door-cta {
          background: transparent;
          border: 1px solid rgba(216,166,87,0.4);
          color: var(--muted);
          border-radius: 999px;
          padding: 10px 20px;
          font-size: 14px;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          margin-top: 6px;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .door-cta:hover { border-color: var(--gold); color: var(--cream); }

        .door-choice { margin-top: 16px; }

        .door-question {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--muted);
          margin-bottom: 12px;
        }

        .door-buttons-area {
          position: relative;
          height: 140px;
          max-width: 320px;
          margin: 0 auto;
        }

        .door-no-btn {
          position: absolute;
          left: 50%;
          bottom: 8px;
          transform: translateX(-50%);
          background: var(--bg2);
          border: 1px solid rgba(216,166,87,0.35);
          color: var(--cream);
          border-radius: 999px;
          padding: 10px 26px;
          font-weight: 700;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
        }

        .door-yes-btn {
          position: absolute;
          background: var(--gold);
          color: #1B0F14;
          border: none;
          border-radius: 999px;
          padding: 10px 20px;
          font-weight: 700;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: left 0.25s ease, top 0.25s ease;
        }

        .final-message {
          margin-top: 22px;
        }

        .hand-holding {
          font-size: 44px;
          display: inline-block;
          animation: handSwing 2.4s ease-in-out infinite;
        }

        @keyframes handSwing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }

        .final-text {
          margin-top: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(20px, 3.6vw, 28px);
          color: var(--cream);
          line-height: 1.5;
        }

        .final-word {
          display: inline-block;
          margin: 0 5px;
          opacity: 0;
          animation: wordPop 0.5s ease forwards;
        }

        @keyframes wordPop {
          0% { opacity: 0; transform: translateY(8px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .replay-btn {
          display: block;
          margin: 22px auto 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .bubble, .bg-heart, .scroll-cue span, .burst-particle, .imposter-popup, .pupil,
          .sparkle, .pulse-heart, .laugh-emoji, .welcome-popup, .hand-holding, .final-word {
            animation: none !important;
          }
          .hero-reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .door-yes-btn {
            transition: none !important;
          }
          .final-word {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="bg-hearts" aria-hidden="true">
        {floatingHearts.map((h) => (
          <Heart
            key={h.id}
            className="bg-heart"
            fill="currentColor"
            size={h.size}
            style={{
              left: `${h.left}%`,
              opacity: h.opacity,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          />
        ))}
      </div>

      {popup && <div className="imposter-popup">{popup}</div>}
      {welcomePopup && <div className="welcome-popup">hi mamiiiii &#129293;</div>}

      {!unlocked && (
        <div className="lock-screen">
          <form className="lock-card" onSubmit={handleUnlock}>
            <div className="bouncer-eyes" aria-hidden="true">
              <div className="eye"><div className="pupil" /></div>
              <div className="eye"><div className="pupil" /></div>
            </div>
            <h2 className="lock-title serif">who's asking?</h2>
            <p className="lock-sub">
              this one's locked. type your name to open it.
            </p>
            <div className="lock-input-row">
              <input
                className={`lock-input ${shakeInput ? "shake" : ""}`}
                type="text"
                placeholder="type your name..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                autoFocus
              />
              <button className="lock-btn" type="submit">
                unlock
              </button>
            </div>
            {attempt > 0 && (
              <div className="lock-attempts">
                attempt {attempt} &#8212; keep trying, bubba
              </div>
            )}
          </form>
        </div>
      )}

      {unlocked && (
        <>
          <section className="hero">
            <div className="chatbox">
              {CHAT_LINES.slice(0, lineIndex).map((line, i) => (
                <div className="bubble" key={i}>
                  {line}
                </div>
              ))}
            </div>

            <div className={`hero-reveal ${heroDone ? "show" : ""}`}>
              <div className="kicker">
                for moyinoluwa <span className="sparkle">&#10024;</span>
              </div>
              <h1 className="title serif">bubba,</h1>
              <div className="nicknames">
                achalugo &middot; my person <span className="pulse-heart">&#129293;</span>
              </div>
              <p className="tagline">
                no occasion. no anniversary. just felt like telling you.
              </p>
              <div className="scroll-cue">
                <span>&#8595;</span>
                keep going
              </div>
            </div>
          </section>

          <section className="content" data-aos="fade-up">
            <div className="label">how it started</div>
            <h2 className="section-title">two blue ticks and a bit of nerve</h2>
            <p className="body-text">
              We met on WhatsApp &#8212; no grand setup, just a message I
              almost didn't send. I still don't fully know what made me hit
              send that day, but I'm glad I did. Every conversation since has
              felt like a small, ridiculous piece of luck.
            </p>
          </section>

          <div className="divider" data-aos="fade-in" />

          <section className="content heavy" data-aos="fade-up">
            <div className="label">the part I don't usually say</div>
            <h2 className="section-title">the night we almost weren't</h2>
            <p className="body-text">
              There was a night we fought so hard we almost stopped being
              us. I don't remember every word that got said, only how quiet
              it felt after, and how much it scared me to think this might
              actually be it. For a while I really thought I'd lost you.
            </p>
            <p className="body-text" style={{ marginTop: 16 }}>
              We didn't come back together because it was easy. We came back
              because losing you was so much worse than doing the hard work
              of staying. I don't take that for granted. I don't think I
              ever will.
            </p>
          </section>

          <div className="divider" data-aos="fade-in" />

          <section className="content" data-aos="fade-up">
            <div className="label">things I keep noticing</div>
            <h2 className="section-title">reasons, in no particular order</h2>
            <div className="reasons">
              {REASONS.map((r, i) => {
                const isOpen = openReason === i;
                return (
                  <div
                    className="reason-card"
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    onClick={() => setOpenReason(isOpen ? null : i)}
                  >
                    <div className="reason-head">
                      <div className="reason-title serif">{r.title}</div>
                      <div className={`reason-plus ${isOpen ? "open" : ""}`}>
                        +
                      </div>
                    </div>
                    <div className={`reason-body ${isOpen ? "open" : ""}`}>
                      <p>{r.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="divider" data-aos="fade-in" />

          <section className="finale" data-aos="zoom-in">
            <h2 className="serif">
              We almost didn't make it here. I'm so glad we did.
            </h2>
            <div className="sub-finale">
              I love you, Moyinoluwa. Today, for no reason, and tomorrow
              too &#8212; on purpose, this time, and every time after.
            </div>
            <button className="love-btn" onClick={spawnBurst}>
              <Heart size={16} fill="#1B0F14" />
              tap this if you feel like it
            </button>
            <div className="footer-note">bubba &middot; achalugo &middot; always</div>
          </section>

          <div className="divider" data-aos="fade-in" />

          <section className="content door-zone" data-aos="fade-up">
            <div className="label">before you go</div>
            <h2 className="section-title">actually, wait</h2>
            <p className="body-text" style={{ margin: "0 auto" }}>
              there's a door right here, if you really want to use it.
            </p>

            <div className="door-frame">
              <div className={`door ${doorOpen ? "open" : ""}`}>
                <div className="door-knob" />
              </div>
              {showPopup && (
                <div className="door-popup">
                  <div className="laugh-emoji">&#128514;</div>
                  <div className="door-popup-text">you for leave nau</div>
                  <button className="door-popup-close" onClick={handleOkay}>
                    okay okay
                  </button>
                </div>
              )}
            </div>

            {!showChoice && (
              <button className="door-cta" onClick={() => setShowChoice(true)}>
                if you want to leave, click here
              </button>
            )}

            {showChoice && !showPopup && !showFinalMessage && (
              <div className="door-choice">
                <p className="door-question">wait, for real?</p>
                <div className="door-buttons-area" ref={yesContainerRef}>
                  <button className="door-no-btn" onClick={handleNo}>
                    no
                  </button>
                  <button
                    className="door-yes-btn"
                    style={{ left: `${yesPos.x}px`, top: `${yesPos.y}px` }}
                    onMouseEnter={moveYesButton}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      moveYesButton();
                    }}
                    onClick={moveYesButton}
                  >
                    {dodgeCount === 0
                      ? "yes"
                      : DODGE_TAUNTS[Math.min(dodgeCount - 1, DODGE_TAUNTS.length - 1)]}
                  </button>
                </div>
              </div>
            )}

            {showFinalMessage && (
              <div className="final-message">
                <div className="hand-holding">&#128107;</div>
                <p className="final-text">
                  {FINAL_LINES.slice(0, finalLineIndex).map((line, i) => (
                    <span className="final-word" key={i}>
                      {line}
                    </span>
                  ))}
                </p>
                {finalLineIndex >= FINAL_LINES.length && (
                  <button className="door-cta replay-btn" onClick={resetDoor}>
                    replay
                  </button>
                )}
              </div>
            )}
          </section>
        </>
      )}

      {bursts.map((p) => (
        <div
          key={p.id}
          className="burst-particle"
          style={{
            left: p.x,
            top: p.y,
            "--dx": `${p.dx}px`,
            "--rot": `${p.rotate}deg`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}