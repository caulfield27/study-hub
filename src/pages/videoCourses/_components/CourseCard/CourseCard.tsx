import { Card } from "@heroui/card";
import { BookOpen, Clock, DollarSign, User } from "lucide-react";
import type { ICourse } from "../../VideoCoursesTypes";
import { getFile } from "@/shared/utils/getFile";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

interface Props{
  course: ICourse
}

export const CourseCard = ({course} : Props) => {
  return (
    <Card className="transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-48">
        <img
          role="button"
          onClick={() => {}}
          src={getFile(course.poster)}
          alt={course.name}
          className="cursor-pointer w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {course.is_free ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              бесплатно
            </span>
          ) : (
            <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
              <DollarSign size={14} />
              платно
            </span>
          )}
        </div>
        {/* <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[course.difficulty]}`}>
            {course.difficulty}
          </span>
        </div> */}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-neutral-200">
          {course.name}
        </h3>

        <p className="text-neutral-300 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div> */}

        <div className="flex items-center justify-between text-sm text-neutral-200 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}ч</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>10 Уроков</span>
          </div>
        </div>
        <div className="w-full mb-3">
          <Button variant="shadow" color="primary" className="w-full">Посмотреть</Button>
        </div>
        
        <Divider className="bg-neutral-600"/>

        <div className="flex items-center gap-2 pt-3">
          <User size={16} className="text-neutral-200" />
          <span className="text-sm text-neutral-300 font-medium">
            {course.author}
          </span>
        </div>
      </div>
    </Card>
  );
}