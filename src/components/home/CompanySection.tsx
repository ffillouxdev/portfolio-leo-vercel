import Image from "next/image";
import React from "react";
import fleo from "@/../public/assets/image/fleo/fleo-logo.svg"
import rocket from "@/../public/assets/image/designIcon/rocket-icon.png"
import cloud from "@/../public/assets/image/designIcon/cloud-icon.svg"

export default function CompanySection() {
    return (
        <>
            <div id="company"></div>
            <section className="py-8 mt-5 fourth-section">
                <div className="flex items-center md:flex-row md:items-center justify-center w-full mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary font-bold font-aquire">FLEO-Web</h2>
                    <Image src={fleo} alt="FLEO-Web" width={80} height={80}
                           style={{objectFit: 'contain'}}/>
                </div>
                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="flex justify-center md:justify-start w-full md:w-1/2 relative">
                        <Image src={rocket} alt="Rocket" width={300} height={600}
                               className="relative z-0 left-0 md:left-40 bottom-0 md:bottom-32"
                               style={{objectFit: 'contain'}}/>
                        <Image
                            src={cloud}
                            alt="Cloud"
                            width={300}
                            height={300}
                            className="absolute left-1/5 bottom-0 lg:left-1/3 xl:left-1/3 md:bottom-16 md:left-1/3 -translate-x-10 md:translate-x-0 z-10 float-animation"
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                    <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
                        <p className="text-center md:text-left w-full md:w-3/4 px-4 md:px-0">
                            Durant l&apos;été 2023, mon ami Florian et moi avons décidé de nous lancer dans
                            l&apos;entrepreneuriat,
                            plus précisément dans le domaine du dropshipping. Nous avons réussi à faire cinq ventes sans
                            trop d&apos;efforts
                            grâce à la publicité, la création d&apos;un site de vente et le design d&apos;un logo. Nous
                            avons aussi mis en place
                            une campagne publicitaire pour la promotion de nos produits. Nous avons constitué un capital
                            de
                            départ de 1500€ et visons
                            des ventes importantes avec des prévisions de bénéfices substantiels.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}
