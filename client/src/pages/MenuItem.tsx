import {Link} from 'react-router-dom'

function MenuItem(){
    return(<div>
        <ul>
            <li><Link to="/practicalcources">PracticalCources</Link></li>
            <li><Link to="/coursesyllabus">CourseSyllabus</Link></li>
        </ul>
       
    </div>)
}

export default MenuItem