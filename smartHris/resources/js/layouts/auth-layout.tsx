// import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

// export default function AuthLayout({
//     children,
//     title,
//     description,
//     ...props
// }: {
//     children: React.ReactNode;
//     title: string;
//     description: string;
// }) {
//     return (
//         <AuthLayoutTemplate title={title} description={description} {...props}>
//             {children}
//         </AuthLayoutTemplate>
//     );
// }
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {children}
        </div>
    );
}

