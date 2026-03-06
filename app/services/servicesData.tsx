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
        content: []
    },
    {
        id: 2,
        titleKey: "services.licensing.title",
        shortDescKey: "services.licensing.desc",
        icon: <FileCheck className="w-12 h-12" />,
        color: "bg-emerald-600",
        path: "/services/perizinan",
        content: []
    },
    {
        id: 3,
        titleKey: "services.hr.title",
        shortDescKey: "services.hr.desc",
        icon: <Lightbulb className="w-12 h-12" />,
        color: "bg-amber-600",
        path: "/services/sdm",
        content: []
    }
];
