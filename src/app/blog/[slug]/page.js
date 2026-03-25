import BlogPost from '../../../pages/BlogPost';

export const metadata = {
  title: 'Dental Health Article | Dentocare Blog',
  description: 'Read expert dental health insights and tips from Dr Nimisha Modi at Dentocare Surat.',
  alternates: { canonical: 'https://www.plusdentocare.in/blog' },
};

export default function Page(props) {
  return <BlogPost {...props} />;
}
