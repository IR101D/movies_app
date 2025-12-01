import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/components/commons/Loading';
import Button from '@/components/commons/Button';
import { MovieProps } from '@/interfaces';
import { MovieDetailsProps } from '@/interfaces';
import { Props } from '@/interfaces';


const MovieDetails: React.FC<Props> = ({ movie }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTrailer, setShowTrailer] = useState(false);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#110F17] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Movie not found</h1>
          <Button title="Go Back" action={() => router.back()} />
        </div>
      </div>
    );
  }

  // Get trailer video (YouTube)
  const trailer = movie.videos?.results?.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#110F17] text-white">
      {/* Backdrop */}
      <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-black to-transparent">
        {movie.backdrop_path && (
          <Image
  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
  alt={movie.title}
  fill
  className="object-cover opacity-40"
  priority
/>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#110F17] via-transparent to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Movie Content */}
      <div className="relative px-4 md:px-10 lg:px-44 -mt-48 md:-mt-32">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-96 md:w-80 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/images/no-poster.jpg'
                }
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Watch Trailer Button */}
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="w-full mt-4 bg-[#E2D609] hover:bg-[#c9c208] text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Trailer
              </button>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex-1 py-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            
            {/* Basic Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5 text-[#E2D609]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                {movie.vote_average.toFixed(1)}/10
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
              <span className="capitalize">{movie.status?.toLowerCase()}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#1A1721] border border-[#E2D609] rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex space-x-8">
                {['overview', 'details', 'cast'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 capitalize font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-[#E2D609] border-b-2 border-[#E2D609]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#E2D609] mb-2">Production</h4>
                    <p className="text-gray-300">
                      {movie.production_companies?.map(company => company.name).join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#E2D609] mb-2">Original Language</h4>
                    <p className="text-gray-300 uppercase">{movie.original_language}</p>
                  </div>
                  {movie.budget > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#E2D609] mb-2">Budget</h4>
                      <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#E2D609] mb-2">Revenue</h4>
                      <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'cast' && (
                <div>
                  <p className="text-gray-400">Cast information would be displayed here.</p>
                  {/* You can fetch and display cast data here */}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                title="Add to Watchlist" 
                action={() => console.log('Add to watchlist')}
              />
              <Button 
                title="Mark as Watched" 
                action={() => console.log('Mark as watched')}
              />
              <Button 
                title="Write Review" 
                action={() => console.log('Write review')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#E2D609] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </div>
          </div>
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
};

// Server-side props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    // Fetch movie details
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`
    );

    if (!movieResponse.ok) {
      throw new Error('Failed to fetch movie');
    }

    const movie = await movieResponse.json();

    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      notFound: true,
    };
  }
};

export default MovieDetails;