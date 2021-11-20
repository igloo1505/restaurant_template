import React, { useState, useEffect, Fragment, forwardRef } from "react";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import clsx from "clsx";
import { gsap } from "gsap";
import * as Types from "../../stateManagement/TYPES";
import { updateProfileData } from "../../stateManagement/userActions";

const imgContainerId = "user-image-container";
const bShadow = {
	fx: 12,
	fy: 12,
	bx: -12,
	by: -12,
	fos: 14,
	bos: 14,
};

const useClasses = makeStyles((theme) => ({
	image: {
		width: "90%",
		height: "90%",
		// borderRadius: "50%",
		borderRadius: "4px",
		transition: theme.transitions.create(["border-radius"], {
			duration: 500,
		}),
	},
	roundedImage: {
		borderRadius: "50% !important",
	},
	profileImageContainer: {
		height: "200px",
		width: "200px",
		minHeight: "200px",
		minWidth: "200px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "linear-gradient(145deg, #fb6711, #d4560e)",
		borderRadius: "4px",
		// width: "100%",
		// paddingTop: "100%",
		transition: theme.transitions.create(["border-radius"], {
			duration: 500,
		}),
	},
	outerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: "1rem",
	},
	addBoxShadow: {
		// boxShadow: `4px 4px 12px ${theme.palette.grey[400]}, -4px -4px 12px ${theme.palette.grey[300]}`,
		boxShadow: `${bShadow.fx}px ${bShadow.fy}px ${bShadow.fos}px ${theme.palette.grey[500]}, ${bShadow.bx}px ${bShadow.by}px ${bShadow.bos}px ${theme.palette.grey[400]}`,
		// boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
	},
}));

const userImage = ({ roundedImg, profileImgUrl }) => {
	const classes = useClasses();
	const theme = useTheme();
	const [addBoxShadow, setAddBoxShadow] = useState(false);

	const animateMouseLeave = () => {
		gsap.to(`#${imgContainerId}`, {
			boxShadow: `${bShadow.fx}px ${bShadow.fy}px ${bShadow.fos}px ${theme.palette.grey[500]}, ${bShadow.bx}px ${bShadow.by}px ${bShadow.bos}px ${theme.palette.grey[400]}`,
			rotateX: 0,
			rotateY: 0,
			duration: 2.5,
			ease: "elastic.out(1.2, 0.2)",
		});
	};

	const animateCircularImageHover = (e) => {
		let rotateRate = 0.022;
		let rec = document.getElementById(imgContainerId).getBoundingClientRect();
		let em = {
			x: rec.left,
			y: rec.top,
			width: rec.width,
			height: rec.height,
			center: {
				x: rec.left + rec.width / 2,
				y: rec.top + rec.height / 2,
			},
		};
		let m = {
			x: e.pageX,
			y: e.pageY,
		};
		let _r = (em.width / 2 + em.height / 2) / 2;
		let factor = 0.7;
		let pX = (m.x - em.center.x) / _r;
		let pY = (m.y - em.center.y) / _r;
		const _nbs = {
			fx: 12 * (1 - pX) * factor,
			fy: 12 * (1 - pY) * factor,
			bx: -12 * (1 + pX) * factor,
			by: -12 * (1 + pY) * factor,
			fos: 14,
			bos: 14,
		};

		gsap.to(`#${imgContainerId}`, {
			boxShadow: `${_nbs.fx}px ${_nbs.fy}px ${_nbs.fos}px ${theme.palette.grey[500]}, ${_nbs.bx}px ${_nbs.by}px ${_nbs.bos}px ${theme.palette.grey[400]}`,
			x: `${pX * rotateRate}%`,
			y: `${pY * rotateRate}%`,
			rotateX: `${Math.floor(pX * rotateRate * 360)}deg`,
			rotateY: `${Math.floor(pY * rotateRate * 360)}deg`,
			perspective: `${_r * 2}px`,
			duration: 0.35,
			ease: "back.out(2.0)",
		});
	};

	useEffect(() => {
		setTimeout(() => {
			setAddBoxShadow(true);
		}, 300);
	}, []);

	return (
		<Slide in={true} direction="right">
			<div>
				<div
					className={clsx(
						classes.profileImageContainer,
						roundedImg && classes.roundedImage,
						addBoxShadow && classes.addBoxShadow
					)}
					id={imgContainerId}
					onMouseEnter={animateCircularImageHover}
					onMouseLeave={animateMouseLeave}
					onMouseMove={animateCircularImageHover}
				>
					<img
						src={profileImgUrl}
						alt={"Profile Image"}
						className={clsx(
							classes.image,
							roundedImg && classes.roundedImage
							// fadeIn && imageClasses.imageIn
						)}
					/>
				</div>
			</div>
		</Slide>
	);
};

export default userImage;
