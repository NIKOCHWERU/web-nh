import { Scale, FileCheck, Lightbulb } from 'lucide-react';
import React from 'react';

export const servicesData = [
    {
        id: 1,
        titleKey: "services.legal.title",
        shortDescKey: "services.legal.desc",
        icon: <Scale className="w-12 h-12" />,
        color: "bg-blue-600",
        path: "/services/hukum",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        content: []
    },
    {
        id: 2,
        titleKey: "services.licensing.title",
        shortDescKey: "services.licensing.desc",
        icon: <FileCheck className="w-12 h-12" />,
        color: "bg-emerald-600",
        path: "/services/perizinan",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        content: []
    },
    {
        id: 3,
        titleKey: "services.hr.title",
        shortDescKey: "services.hr.desc",
        icon: <Lightbulb className="w-12 h-12" />,
        color: "bg-amber-600",
        path: "/services/sdm",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        content: []
    }
];
