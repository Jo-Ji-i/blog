// posts/post/[slug]/page.tsx <post 상세>

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
