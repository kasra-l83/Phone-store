import type { Metadata } from "next";
import Image from 'next/image'

export const metadata: Metadata= {
  title: "درباره ما"
}

export default function About() {
  return (
    <section>
      <div className="flex justify-center"><h2 className="text-4xl font-bold border-b-4 border-b-blue-500 pb-3 mb-5">درباره ما</h2></div>
      <div className="flex items-center justify-center gap-x-12 mb-5">
        <div className="text-center">
          <span className="flex text-4xl font-semibold justify-center">
            <h2 className="text-blue-900">پلی</h2>
            <h2 className="text-yellow-700">مدا</h2>
          </span>
          <h2 className="text-3xl sm:text-4xl text-blue-900 font-semibold">PLAY<span className="text-yellow-700">MEDA</span></h2>
        </div>
        <Image src="/icon/logo.png" alt='Logo' width={128} height={128} className="size-32 bg-red-800 rounded-full"/>
      </div>
      <ul className="flex flex-col gap-y-10 text-lg font-light">
        <li>فروشگاه آنلاین پلی مدا، یک فروشگاه تخصصی در حوزه بازی‌های رایانه‌ای است که از سال ۹۵ کار خود را با هدف ارائه‌ی خدمات اعم از فروش و مشاوره تخصصی کالاهای گیم آغاز کرد. شما می‌توانید در این فروشگاه بهترین کالاهای گیمینگ از برندهای معتبر را با بهترین کیفیت دریافت کنید و یا از طریق تماس با کارشناسان فروشگاه پلی مدا، که خود گیمرهای توانمند کشور هستند، سوالات و مشکلات خود در میان بگذارید.</li>
        <li>فروشگاه پلی مدا به عنوان نماینده‌ی فروش بسیاری از برندهای معتبر گیمینگ از قبیل ریزر٬ رپو٬ ام‌اس‌آی، ایسوس٬ لاجیتک و ... این تضمین را به شما می‌دهد که کالای اصیل مد نظر شما در اسرع وقت و با بهترین بسته بندی در اختیار شما قرار می‌گیرد.</li>
        <li>در حال حاضر فروش محصولات در فروشگاه اگزو هم به شکل اینترنتی و هم به شکل حضوری ممکن است و نحوه‌ی پرداخت برای مشتریان تهرانی هم بصورت آنلاین و هم بصورت پرداخت در محل قابل انجام است و همراهان عزیز شهرستانی هم می توانند بصورت آنلاین پرداخت خود را انجام دهند. همچنین نحوه ارسال در تهران بصورت پیک موتوری است و ارسال برای سایر شهرها از طریق پست و تیپاکس می‌باشد.</li>
        <li>شما عزیزان می‌توانید از طریق شبکه‌های اجتماعی فروشگاه پلی مدا از قبیل کانال تلگرام٬ صفحه‌ی اینستاگرام و آپاراتاز آخرین اخبار دنیای بازی و پشنهادهای ویژه ما آگاه شوید. همچنین می‌توانید از طریق شماره تلفن ۰۲۱۸۸۲۲۶۵۹۶ و ۰۲۱۸۸۲۲۶۵۳۱  ( از ساعت ۱۰ تا ۱۸) و ایمیل info@exo.ir جهت مشاوره و یا طرح سوالات خود با کارشناسان فروشگاه در ارتباط باشید.</li>
        <li>لذت گیم با پلی مدا ؛ عرضه کننده تخصصی کالاهای گیمینگ</li>
      </ul>
    </section>
  )
}