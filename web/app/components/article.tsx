import { PortableText } from '@portabletext/react';

type Props = { title: string; subtitle?: string; imageUrl?: string; text: any };

const Article = ({ title, subtitle, imageUrl, text }: Props) => (
  <div className='article'>
    <h4 className='article-title'>{title}</h4>
    {subtitle && <p className='article-subtitle'>{subtitle}</p>}
    {imageUrl && <img className='article-image' src={imageUrl} />}
    <div className='article-text'>
      <PortableText value={text} />
    </div>
  </div>
);

export default Article;
