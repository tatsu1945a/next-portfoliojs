// app/blog/page.js

import Link from 'next/link'
import Image from 'next/image'
import fs from "fs"
import path from "path"
import matter from "gray-matter"

async function getAllBlogs() {
  const files = fs.readdirSync(path.join("data"))
  //console.log("DEBUG01", files)
  const blogs = files.map((fileName) => {
    const slug = fileName.replace(".md", "")
    const fileData = fs.readFileSync(
      path.join("data", fileName),
      "utf-8"
    )
    //console.log("DEBUG02", fileData)
    const {data} = matter(fileData)
    return {
      frontmatter: data,
      slug: slug,
    }
  })
  const orderdBlogs = blogs.sort((a,b) => {
    return b.frontmatter.id - a.frontmatter.id
  })
  return {
    blogs: blogs
  }
}


const Blog = async() => {
  //getAllBlogs()
  const {blogs} = await getAllBlogs()
  console.log("Debug003",blogs)
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>ブログページ</h1>
          <p>エンジニア日常生活</p>
          {blogs.map((blog, index) => 
            <div key={index}>
              <div>
                <h2>{blog.frontmatter.title}</h2>
                <p>{blog.frontmatter.date}</p>
                <Link href={`/blog/${blog.slug}`}>Read More</Link>
              </div>
              <div className="blogImg">
                <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} priority={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog