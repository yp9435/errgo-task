import React, { useState, type FormEvent } from 'react';
import { Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../controller/ProjectController'; // importsss

// found 1 TODO and a Bonus task, made onsubmit async and called createprojects, added the validation, success and error alerts and redirected the user!

export const ProjectPage: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const navigate = useNavigate();

  /**
   * Submits the form to create the project
   * 
   * @param event The form event
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    /**
     * TODO:
     * Complete the method by calling the `createProject() method in ProjectController.ts`
     * After creating project, verify that the server response is 200 before alerting the user and redirecting to the '/project-details' page
     * 
     * BONUS - Add simple validation to the form inputs to not allow empty string and display an error alert
     */

    // validationnnn
    if (!projectName || !projectDescription) {
      alert("Please fill in all fields!!");
      return;
    }

    try {
      await createProject({ name: projectName, description: projectDescription });
      alert("Created the Projectt!"); // successss 
      navigate('/project-details'); // redirectttt
    } catch (error) {
      console.error(error); // errorrrrrr
      alert("There was an error. Please try again!");
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Centered Content Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          {/* Project Creation Form */}
          <form onSubmit={onSubmit}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold">Begin your Project Journey</h1>
            </div>

            <div className="space-y-4">
              {/* Project Name */}
              <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input type="text" className="bg-transparent w-full border-none focus:outline-none" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                </div>
                <Eye className="h-5 w-5 text-gray-500" />
              </div>

              {/* Project Description */}
              <div className="bg-gray-100 rounded-md p-3 flex items-start justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea rows={3} className="bg-transparent w-full border-none focus:outline-none" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                </div>
                <FileText className="h-5 w-5 text-gray-500 mt-1" />
              </div>

              {/* Create Project Button */}
              <input className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer" type="submit" value="Create Project"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};