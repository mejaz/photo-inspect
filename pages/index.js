import {useState, useEffect} from "react";
import Head from "next/Head";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";

export default function Home() {
	const [originalImage, setOriginalImage] = useState('');
	const [processing, setProcessing] = useState(false)
	const [labels, setLabels] = useState([])

	return (
		<main className="flex flex-col min-h-screen">
			<Head>
				<title>Photo Inspect - Identify Objects In A Photo</title>
			</Head>
			<div className={'w-full flex-grow'}>
				<Header/>
				<div className={'mt-24 px-4 my-6'}>
					<div className={'max-w-5xl mx-auto'}>
						<Intro/>
						<div className={'w-full lg:w-2/3'}>
							<FileUpload
								setOriginalImage={setOriginalImage}
								processing={processing}
								setProcessing={setProcessing}
								setLabels={setLabels}
							/>
						</div>

						{originalImage && (
							<div className={'relative mt-6'}>
								<img
									src={originalImage}
									alt="newImage"
									style={{width: "100%", marginBottom: "10px"}}
								/>
								{labels.map((label) => (
									label.Instances && label.Instances.map((instance, index) => (
											<div
												key={index}
												className={'rounded-md'}
												style={{
													position: "absolute",
													top: `${instance.BoundingBox.Top * 100}%`,
													left: `${instance.BoundingBox.Left * 100}%`,
													width: `${instance.BoundingBox.Width * 100}%`,
													height: `${instance.BoundingBox.Height * 100}%`,
													border: "2px solid yellow",
												}}
											>
												<label className={'bg-primary-dark text-primary-contrastText'}>{label.Name}</label>
											</div>
										)
									)))
								}
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer/>
		</main>
	);
}
