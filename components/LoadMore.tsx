"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { useInView } from 'react-intersection-observer';
import { fetchAnime } from '@/app/action';
import AnimeCard from './AnimeCard';
import AnimeProp from './AnimeCard';

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMoreAnime = async () => {
      setLoading(true);
      const res = await fetchAnime(page);
      setData((prevData) => [...prevData, ...res]);
      setLoading(false);
      page++;
    };

    if (inView && !loading) {
      loadMoreAnime();
    }
  }, [inView]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {loading && (
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
