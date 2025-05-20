export const COLORS = {
  darkBlue: '#2B3089',
  lightBlue: '#1D9EE2',
  purple: '#AB4A9C',
  white: '#FFFFFF',
  lightGray: '#F5F7FA',
  mediumGray: '#E2E8F0',
  darkGray: '#4A5568',
  black: '#1A202C',
};

export const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
];

export const FEATURES = [
  {
    title: 'Drag & Drop Tasks',
    description: 'Effortlessly move tasks between columns with our intuitive drag and drop interface.',
    icon: 'Move',
  },
  {
    title: 'Customizable Workflow',
    description: 'Adapt TaskCraft to your needs with customizable columns and workflow stages.',
    icon: 'LayoutGrid',
  },
  {
    title: 'Task Prioritization',
    description: 'Easily prioritize your tasks to focus on what matters most to you.',
    icon: 'ListOrdered',
  },
  {
    title: 'Deadline Management',
    description: 'Never miss a deadline with our visual timeline and notification system.',
    icon: 'Calendar',
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team members through comments and assignments.',
    icon: 'Users',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor project progress with visual dashboards and detailed reports.',
    icon: 'BarChart',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    content: 'TaskCraft has transformed how our team manages projects. The drag and drop interface is intuitive, and we love how customizable the workflows are.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'David Chen',
    role: 'CTO at Startup Labs',
    content: 'We tried several task management tools before finding TaskCraft. The ability to customize columns for our specific workflow has made a huge difference in our productivity.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Design Team Lead at CreativeBox',
    content: 'As a design team, we needed a visual way to track our projects. TaskCraft\'s interface is not only functional but beautifully designed. Its a pleasure to use daily.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const BOARD_COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#EBF8FF' },
  { id: 'inprogress', title: 'In Progress', color: '#E9D8FD' },
  { id: 'inreview', title: 'In Review', color: '#FEEBC8' },
  { id: 'done', title: 'Done', color: '#C6F6D5' },
];

export const SAMPLE_TASKS = [
  { id: 1, title: 'Redesign homepage', column: 'todo', priority: 'High' },
  { id: 2, title: 'Fix login page bug', column: 'inprogress', priority: 'Medium' },
  { id: 3, title: 'Implement user settings', column: 'inreview', priority: 'Low' },
  { id: 4, title: 'Update documentation', column: 'done', priority: 'Medium' },
  { id: 5, title: 'Create onboarding flow', column: 'todo', priority: 'High' },
  { id: 6, title: 'Optimize database queries', column: 'inprogress', priority: 'High' },
];