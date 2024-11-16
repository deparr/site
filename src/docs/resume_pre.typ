#let meta = (
  name: "David Parrott",
  email: "EMAIL",
  phone: "PHONE",
)

#set document(
  title: meta.name,
  author: meta.name,
  date: none,
  keywords: (
    "resume",
    "cv",
  )
)

#set page(
  paper: "us-letter",
  margin: (
    x: 0.5in,
    y: 0.5in,
  ),
)


#set text(
  // font: "Libertinus Serif",
  size: 13pt,
  weight: "regular",
  lang: "en",
  ligatures: false,
)

#let header_link(url, label, line: true) = {
  underline(
    stroke: if line {0.8pt} else {0pt},
    link(url, label)
  )
}

#let two-by-two(
  top-left: "",
  top-right: "",
  bottom-left: "",
  bottom-right: "",
) = {
  pad[
    #top-left #h(1fr) #top-right \
    #bottom-left #h(1fr) #bottom-right
  ]
}

#let one-by-two(
  left: "",
  right: "",
) = {
  pad[
    #left #h(1fr) #right
  ]
}

#let showdate(date) = {
  date.display(
    "[month repr:long] [year repr:full]"
  )
}

#let edu(title, subtitle, start, end, loc, details) = {
  two-by-two(
    top-left: strong(title),
    top-right: loc,
    bottom-left: emph(subtitle),
    bottom-right: emph(showdate(start) + if end != none {$dash.en$ + showdate(end)}else {""}),

  )
  list(indent: 10pt, ..details)
}

#let experience(exps) = {
  for exp in exps {
    two-by-two(
      top-left: strong(exp.title),
      top-right: showdate(exp.start) + $dash.en$ + if exp.end != none { showdate(exp.end) } else {"Present"},
      bottom-left: emph(exp.company),
      bottom-right: emph(exp.loc)
    )

    list(indent: 10pt, ..exp.details)
  }
}

#let projects(projs) = {
  // set par(
  //   spacing: 15pt
  // )
  for proj in projs {
    text(weight: 800, proj.name + ": ")
    
    list(indent: 10pt, ..proj.desc)
  }
}

#let skills(sklls) = {
  // set par(
  //   spacing: 10pt
  // )
  for skill in sklls {
    text(weight: 800, skill.cat + ": ")

    pad(left: 10pt, skill.items.join(", "))
    v(5pt)
  }
}

#show heading.where(level: 1): it => {
  set align(center)
  set text(
    size: 23pt,
    weight: 700,
  )

  pad(bottom: 0pt, it.body)
}

#show heading.where(level: 2): it => {
  set align(left)
  set text(
    size: 15pt,
    weight: "bold",
  )
  pad(top: 0pt, bottom: -10pt, [#smallcaps(it.body)])
  line(length: 100%, stroke: 1pt)
}

= #(meta.name)
// #align(center)[
//   #grid(
//     columns: 9,
//     rows: 1,
//     align: center,
//     gutter: 6pt,
//     text(meta.phone),
//     [|],
//     header_link(line: false, "mailto:" + meta.email, meta.email),
//     [|],
//     header_link("https://linkedin.com/in/dparrott", "linkedin.com/dparrott"),
//     [|],
//     header_link("https://github.com/deparr", "github.com/deparr"),
//     [|],
//     header_link("https://dparrott.dev", "dparrott.dev")
//   )
// ]

#set text(size: 12pt)
#pad(
  top: 5pt,
  align(center)[
    #(
      (
        text(meta.phone),
        link("mailto:" + meta.email),
        header_link("https://linkedin.com/in/dparrott", "linkedin.com/in/dparrott"),
        header_link("https://github.com/deparr", "github.com/deparr"),
        header_link("https://dparrott.dev", "dparrott.dev"),
      ).join(" | ")
    )
  ],
)

// TODO get rid of this text size swapping
#set text(size: 13pt)
== Education
#edu("Brigham Young University", "Bachelor of Science, Computer Science",
        datetime(year: 2024, month: 4, day: 1), none, "Provo, UT",
        (
          [Cumulative GPA: 3.61],
          [Relevant Coursework: Data Structures and Algorithms, Web Programming, Database Modeling, Systems Programming, Computer Security, Data Science, Computer Vision],
        )
)

== Experience
#experience(
  (
    (
      title: "Backend Developer",
      company: "BYU Law School IT",
      start: datetime(year:2023,month:5,day:1),
      end: datetime(year:2024,month:5,day:1),
      loc: "Provo, UT",
      details: (
        "Rapidly iterated on greenfield Node.js REST backend",
        "Collaborated with other developers to align on project design specifications",
        "Managed infrastructure-as-code configurations and deployments",
        "Refactored legacy code to improve performance and future maintainability"
      )
    ),
    (
      title: "Teaching Assistant",
      company: "BYU Computer Science",
      start: datetime(year:2021,month:9,day:1),
      end: datetime(year:2023,month:5,day:1),
      loc: "Provo, UT",
      details: (
        "Mentored other students in C, x86 assembly, and other systems programming topics",
        "Reduced grading time by ~80% through automating project grading and testing",
      )
    )
  )
)

== Projects
#projects(
  (
    (name: "CHIP-8 Emulator", desc: ("Software Emulator of the CHIP-8 system written with Rust and SDL",)),
    (name: "Android Twitter Clone", desc: ("Native Java client with a scaling AWS backend using Lambda, S3, SQS, and DynamoDB",)),
    (name: "Datalog Interpreter", desc: ("A Datalog lexer, parser, and optimizing interpreter for written in C++",)),
  )
)

// make this take input so can generate a tailored resume on fly ???
== Skills
#skills(
  (
    (
      cat: "Programming Languages",
      items: ("Golang", "Lua", "Python", "Rust", "C", "C++", "Javascript", "SQL", "Bash", "Java", "HTML/CSS")
    ),
    (
      cat: "Technologies and Frameworks",
      items: ("Node.js", "React.js", "Docker", "Solid.js", "AWS (Lambda, S3, ECC, DynamoDB)", "Flask", "REST APIs")
    ),
  )
)

