import { useState } from "react";
import { loveCoupons } from "../../data/monthsaryData";

export default function LoveTokens() {
  const [redeemed, setRedeemed] = useState({});
  const [loveMeter, setLoveMeter] = useState(100);
  const [reactionFeedback, setReactionFeedback] = useState("");

  const handleRedeem = (id, title) => {
    setRedeemed((prev) => ({
      ...prev,
      [id]: true
    }));
    setReactionFeedback(`🎟️ "${title}" redeemed! Javier is on standby to deliver!`);
    setTimeout(() => setReactionFeedback(""), 4000);
  };

  const handleLoveReaction = (type, bonus) => {
    setLoveMeter((prev) => prev + bonus);
    if (type === "kiss") {
      setReactionFeedback("💋 Mwah! 100 kisses delivered straight to Javier's heart!");
    } else if (type === "hug") {
      setReactionFeedback("🤗 Warm tight hug received! Javier feels your embrace!");
    } else if (type === "love") {
      setReactionFeedback("💖 Forever and always! Javier loves you to infinity and beyond!");
    }
    setTimeout(() => setReactionFeedback(""), 4500);
  };

  return (
    <div className="tokens-section" id="tokens">
      <div className="section-intro">
        <span className="section-badge">Monthsary Privileges</span>
        <h3 className="section-heading">Kollene's VIP Love Coupons</h3>
        <p className="section-subtext">
          Handcrafted vouchers redeemable anytime. No expiration date. Backed by Javier's word of honor.
        </p>
      </div>

      {reactionFeedback && (
        <div className="reaction-toast animate-bounce">
          <span>{reactionFeedback}</span>
        </div>
      )}

      <div className="coupons-grid">
        {loveCoupons.map((coupon) => {
          const isRedeemed = redeemed[coupon.id];
          return (
            <div key={coupon.id} className={`coupon-card ${isRedeemed ? "redeemed" : ""}`}>
              <div className="coupon-cutout-left" />
              <div className="coupon-cutout-right" />
              
              <div className="coupon-top">
                <span className="coupon-icon">{coupon.icon}</span>
                <span className="coupon-badge">{coupon.badge}</span>
              </div>

              <h4 className="coupon-title">{coupon.title}</h4>
              <p className="coupon-desc">{coupon.desc}</p>

              <div className="coupon-footer">
                {isRedeemed ? (
                  <div className="stamp-redeemed animate-stamp">
                    REDEEMED &hearts;
                  </div>
                ) : (
                  <button 
                    className="btn-redeem"
                    onClick={() => handleRedeem(coupon.id, coupon.title)}
                  >
                    <span>Redeem Token ✨</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Love Meter & Interactive Reactions */}
      <div className="love-meter-box">
        <div className="love-meter-header">
          <span className="meter-label">LIVE LOVE METER</span>
          <span className="meter-percentage">{loveMeter}% (Infinite Capacity)</span>
        </div>

        <div className="meter-bar-track">
          <div 
            className="meter-bar-fill" 
            style={{ width: `${Math.min(100, (loveMeter / 500) * 100)}%` }} 
          />
        </div>

        <div className="meter-reactions">
          <button 
            className="btn-reaction"
            onClick={() => handleLoveReaction("kiss", 50)}
          >
            <span>💋 Send Kiss</span>
          </button>
          <button 
            className="btn-reaction"
            onClick={() => handleLoveReaction("hug", 75)}
          >
            <span>🤗 Send Tight Hug</span>
          </button>
          <button 
            className="btn-reaction btn-love-main"
            onClick={() => handleLoveReaction("love", 100)}
          >
            <span>💍 I Love You Too, Javier!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
