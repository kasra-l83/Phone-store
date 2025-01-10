"use client"

import { useSearchParams } from 'next/navigation';

export default function Result() {
  const searchParams= useSearchParams();
  const status= searchParams.get("status");

  return (
    <section>
      {status=== "success" ? (
        <p>پرداخت موفقیت آمیز بود</p>
      ): <p>پرداخت موفقیت آمیز نبود</p>}
    </section>
  )
}