/**
 * BONUS: Implement zod schema for model validation
 */

// completed bonus task , used zod to create a schema for project validation

import { z } from "zod"; // importsss

export interface IProject {
    id: string;
    name: string;
    description: string;
}

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Project description is required"),
});

