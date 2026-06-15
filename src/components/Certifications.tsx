"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Eye, Download, X, ShieldCheck, ExternalLink } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import Image from "next/image";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  pdf: string;
  credId: string;
  color: "purple" | "cyan";
}

const CERTS_DATA: Certificate[] = [
  {
    title: "Generative AI with AWS",
    issuer: "Amazon Web Services (AWS)",
    date: "Feburary 2026",
    image: "/images/aws.png",
    pdf: "/certificates/cert-aws.pdf",
    credId: "ibeho3j4mg",
    color: "purple",
  },
  {
    title: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB Academy",
    date: "June 2026",
    image: "/images/mongodb.png",
    pdf: "/certificates/cert-mongodb.pdf",
    credId: "b347eabb-63a5-4bd6-98ef-16c40779cf89",
    color: "cyan",
  },
  {
    title: "Claude Code: The Coding Assistant",
    issuer: "Anthropic Training Partner",
    date: "February 2026",
    image: "/images/claude.png",
    pdf: "/certificates/cert-claude.pdf",
    credId: "cirw2ei7q7",
    color: "purple",
  },
  {
    title: "Design to Deploy – A Full Stack Web Journey",
    issuer: "Vercel & Next.js Partner",
    date: "December 2025",
    image: "/images/deploy.png",
    pdf: "/certificates/cert-deploy.pdf",
    credId: "certificate",
    color: "cyan",
  },
];

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            04 . Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Professional Certifications
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTS_DATA.map((cert, index) => {
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  glowColor={cert.color}
                  className="flex flex-col h-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all p-0 overflow-hidden group"
                  hoverable={false}
                >
                  {/* Thumbnail Container */}
                  <div className="relative w-full h-40 overflow-hidden border-b border-white/5 bg-black/40">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        className="gap-2 text-xs"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <Eye className="w-4 h-4" /> Quick View
                      </Button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Issuer */}
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2 block">
                        {cert.issuer}
                      </span>
                      
                      {/* Title */}
                      <h4 className="text-sm font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-secondary transition-colors duration-200">
                        {cert.title}
                      </h4>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-1.5 text-white/50 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        <span>{cert.date.split(" ")[1] || cert.date}</span>
                      </div>
                      
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-all"
                      >
                        Details <Eye className="w-3 h-3 text-primary" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Full Certificate Modal View */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl glass-panel-heavy rounded-2xl border border-white/10 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Image View */}
              <div className="relative w-full h-[240px] sm:h-[300px] bg-black border-b border-white/5">
                <Image
                  src={selectedCert.image}
                  alt={`${selectedCert.title} full size`}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Certificate Metadata */}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="purple" className="text-[10px] font-bold">
                    {selectedCert.issuer}
                  </Badge>
                  <Badge variant="cyan" className="text-[10px] font-mono">
                    ID: {selectedCert.credId}
                  </Badge>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-4 leading-snug">
                  {selectedCert.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-white/5 text-sm mb-6">
                  <div className="flex items-center gap-2 text-white/70">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Verified Academic Credential</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Issued: {selectedCert.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={selectedCert.pdf}
                    download={`${selectedCert.title.replace(/\s+/g, "_")}.pdf`}
                    className="flex-1"
                  >
                    <Button variant="primary" className="w-full gap-2 text-sm justify-center">
                      <Download className="w-4 h-4" /> Download Certificate
                    </Button>
                  </a>
                  
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 text-sm justify-center"
                    onClick={() => setSelectedCert(null)}
                  >
                    Close Modal
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
