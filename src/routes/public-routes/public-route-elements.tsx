import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PublicGuard } from '../guard';
import PublicLayout from '@/components/layouts/PublicLayout';

const LandingPage = lazy(() => import('@/pages/website/landing-page'));
const AboutUs = lazy(() => import('@/pages/website/about'));
const SignIn = lazy(() => import('@/pages/authentication/sign-in-page'));
const Register = lazy(() => import('@/pages/authentication/register-page'));

export const PublicRoot = () => (
  <PublicGuard>
    <PublicLayout />
  </PublicGuard>
);

export const LazyLandingPage = () => <LandingPage />;
export const LazyAbout = () => <AboutUs />;
export const LazySignIn = () => <SignIn />;
export const LazyRegister = () => <Register />;
export const PublicNotFound = () => <Navigate to="/sign-in" replace />;