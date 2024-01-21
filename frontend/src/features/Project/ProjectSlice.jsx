import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProject, deleteProjectById, fetchAllProjects, fetchProjectById, fetchProjectByProffessorId, updateProjectById } from "./ProjectApi";

const initialState={
    projects:[],
    status:"idle",
    selectProject:null
}


export const addProjectAsync=createAsyncThunk("project/addProjectAsync",async(data)=>{
    const addedProject=await addProject(data)
    return addedProject
})
export const fetchAllProjectAsync=createAsyncThunk("project/fetchAllProjectAsync",async()=>{
    const fetchedProjects=await fetchAllProjects()
    return fetchedProjects
})
export const fetchProjectByIdAsync=createAsyncThunk("project/fetchProjectByIdAsync",async(id)=>{
    const fetchedProjects=await fetchProjectById(id)
    return fetchedProjects
})
export const fetchProjectByProfessorIdAsync=createAsyncThunk("project/fetchProjectByProfessorIdAsync",async(id)=>{
    const fetchedProjectsSpecific=await fetchProjectByProffessorId(id)
    return fetchedProjectsSpecific
})
export const updateProjectByIdAsync=createAsyncThunk("project/updateProjectByIdAsync",async(update)=>{
    const updatedProject=await updateProjectById(update)
    return updatedProject
})
export const deleteProjectByIdAsync=createAsyncThunk('project/deleteProjectByIdAsync',async(id)=>{
    const deletedProject=await deleteProjectById(id)
    return deletedProject
})

const projectSlice=createSlice({
    name:"projectSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addProjectAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(addProjectAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects.push(action.payload)
            })
            .addCase(addProjectAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(fetchAllProjectAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchAllProjectAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects=action.payload
            })
            .addCase(fetchAllProjectAsync.rejected,(state)=>{
                state.status='error'
            })

            
            .addCase(fetchProjectByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchProjectByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.selectProject=action.payload
            })
            .addCase(fetchProjectByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(updateProjectByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateProjectByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                const index=state.projects.findIndex((project)=>project.id===action.payload.id)
                state.projects[index]=action.payload
            })
            .addCase(updateProjectByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(deleteProjectByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(deleteProjectByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects=state.projects.filter((proj)=>proj.id!==action.payload.id)
            })
            .addCase(deleteProjectByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(fetchProjectByProfessorIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchProjectByProfessorIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects=action.payload
            })
            .addCase(fetchProjectByProfessorIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectAllProjects=(state)=>state.ProjectSlice.projects
export const selectSelectProject=(state)=>state.ProjectSlice.selectProject

export default projectSlice.reducer