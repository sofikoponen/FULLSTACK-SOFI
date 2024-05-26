const Header = (props) => {
    return (
      <div>
        <h2>{props.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.tasks}
      </p>
    )
  }
  const Content = ({parts}) => {
    return (
      parts.map(part => <Part key={part.id} part={part.name} tasks={part.exercises}/>)
        
    )
  }
  
  const Total = ({exercises}) => {
  
    return (
    <strong> {'Total of ' + exercises.reduce((a, b) => a + b) + ' exercises'}</strong>
    )
  }

  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total exercises={course.parts.map(a => a.exercises)}/>
      </div>
    )
  }
  
export default Course