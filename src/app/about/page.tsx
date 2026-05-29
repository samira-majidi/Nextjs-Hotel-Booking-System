// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container-main">
      <div className="card-base">
        <h2>کارت نمونه</h2>
        <button className="btn-primary">ذخیره</button>
        <button className="btn-secondary">لغو</button>
      </div>
      
      <input className="input-base" placeholder="نام خود را وارد کنید" />
      
      <span className="badge">جدید</span>
      <span className="badge-success">موفق</span>
    </div>
  );
}