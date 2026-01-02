
import dynamic from 'next/dynamic';

// Only import client component on client side
const ExpertiseClient = dynamic(() => import('../ExpertiseClient'), { ssr: false });

export default ExpertiseClient;
