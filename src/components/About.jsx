import React from 'react'
import styled from 'styled-components'
import FlipCard from 'react-flipcard'

import { PRIMARY } from '../utils'
import { contributors } from '../utils'

let Div = styled.div`
  height: 100%;
  padding: 32px 20%;
  color: ${PRIMARY};
  line-height: 1.5;
  
`

let H1 = styled.h1`
  border-bottom: 1px dashed  ${PRIMARY};
  
`

let P = styled.p`
  margin: 12px 0;
`

let Link = styled.a`
  text-decoration: none;
  color: ${PRIMARY};
  &:hover {
    text-decoration: underline;
  }
`


let CardDiv = styled.div`
  box-shadow: rgba(0, 0, 0, .3) 0px 1px 7px 0px;
  background-color: white;
  padding: 16px;
  borderRadius: 4px;
  width: 200px;
  height: 200px;
  outline: none;
  color: ${PRIMARY};
  line-height: 2;
  z-index: 2;
`

function Avatar({ url, blogUrl, blogName, name, dowhat }) {
  
  return <div style={{
    display: 'inline-block',
    width: '232px',
    height: '200px',
    margin: '16px'
  }}>
    <FlipCard>
      <CardDiv>
        <img width="200px" height="200px" src={url} alt=""/>
      </CardDiv>
      <CardDiv>
        <p><span style={{display: 'inline-block', width: '60px'}}>name:</span>{name}</p>
        <p><span style={{display: 'inline-block',width: '60px'}}>blog:</span><Link href={blogUrl}>{blogName}</Link></p>
        <p style={{
          borderTop: `1px dashed ${PRIMARY}`,
          paddingTop: '16px'
        }}>
          {dowhat}
        </p>
      </CardDiv>
    </FlipCard>
    </div>
}

export default function({}) {
  return <Div>
    <H1>关于 TSZ 图床</H1>
    <P>本图床使用来自 <Link href="https://sm.ms">sm.ms</Link> 的 API 。不要上传非法的图片。 如： 色情， 暴力等等。</P>
    <P>这个项目的源码在 <Link href="https://github.com/mrcodehang/tsz">github</Link> 上是公开的， 欢迎 star ， 欢迎你的 issues 和  PR </P>
    <H1>为什么要做 TSZ 图床， 而不是直接用 <Link href="https://sm.ms">sm.ms</Link> ？</H1>
    <P>这是因为 sm.ms 不支持保存图片上传历史。  而且我们想要的不仅仅是保存图片历史， 还支持对图片分类， 分类检索等等。 还支持同步你的上传历史到我们的服务器上， 让所有使用 TSZ 图床的人都能找到你的图片。 这个版本其实还有很多功能待实现， 比如说本地历史记录的导入/导出, History 里的图片放缩等等。 如果你想要这个图床变得更加实用， 方便， 欢迎来提 PR 。</P>
    <H1>目前的贡献者</H1>
    <P>只要你参与了贡献， 你的大头贴将会被贴在下面， 这并非是强迫性质的。</P>
    <P>目前总共有 {contributors.length} 位贡献者</P>

    <div>
      
      {contributors.map(contributor => <Avatar {...contributor} />)}
    </div>
  </Div>
}