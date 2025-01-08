'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';
 
export default function Scanner() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profileData = sessionStorage.getItem('profileData');
      if (profileData) {
        const parsedData = JSON.parse(profileData);
        setUserId(parsedData.id);
      }
      setLoading(false);
    }
  }, []);
 
  useEffect(() => {
    if (!loading && userId === null) {
      router.push('/');
    }
  }, [userId, loading, router]);
 
  if (loading || userId === null) {
    return null;
  }
  return (
    <div>
      <QRScanner />
    </div>
  );
}
 
function QRScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerStopped, setScannerStopped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<Record<string, string>>({});
 
  useEffect(() => {
    const user = sessionStorage.getItem('profileData');
    if (user) {
      const parsedData = JSON.parse(user);
      setUserData({
        r1e584eb2cfd743abad332dada96f06fd: parsedData.profile.firstName || '',
        ra1042737eb9b44a3a80e11071bec9387: parsedData.profile.lastName || '',
        raef477d0791c4180911a179e85e61004: parsedData.profile.login || '',
      });
    }
  }, []);
 
  const stopScanning = useCallback(() => {
    if (scanner) {
      scanner.reset();
      setIsScanning(false);
      setScannerStopped(true);
    }
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMediaStream(null);
    }
  }, [scanner, mediaStream]);
 
  const startScanning = () => {
    // Stop any existing media stream
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks (cameras)
      setMediaStream(null); // Clear state
    }
 
    // Reset states to allow for re-scanning
    setScannerStopped(true);
    setScannedData(null);
    setError(null);
    setFormUrl(null);
 
    // Delay resetting scannerStopped to ensure video element is properly remounted
    setTimeout(() => {
      setScannerStopped(false);
    }, 0);
 
    if (videoRef.current) {
      const codeReader = new BrowserMultiFormatReader();
      setScanner(codeReader);
 
      codeReader
        .listVideoInputDevices()
        .then((devices) => {
          let selectedDeviceId = '';
 
          if (isMobileDevice()) {
            // On mobile (Android & iOS), force the back camera
            const backCamera = devices.find(
              (device) => device.kind === 'videoinput' && device.label.toLowerCase().includes('back')
            );
            selectedDeviceId = backCamera ? backCamera.deviceId : devices[0].deviceId;
          } else {
            // On desktop, use the front camera
            const frontCamera = devices.find(
              (device) => device.kind === 'videoinput' && device.label.toLowerCase().includes('front')
            );
            selectedDeviceId = frontCamera ? frontCamera.deviceId : devices[0].deviceId;
          }
 
          // Start decoding from the selected camera device
          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result) {
              setScannedData(result.getText());
              stopScanning();
              if (isValidUrl(result.getText())) {
                const prefilledUrl = appendQueryParams(result.getText(), userData);
                setFormUrl(prefilledUrl);
              } else {
                setError('Invalid QR code or unsupported data');
                setFormUrl(null);
              }
            }
 
            if (err && !(err instanceof NotFoundException)) {
              console.error('Error scanning QR code:', err);
            }
          });
        })
        .catch((err) => {
          console.error('Error accessing video devices:', err);
        });
    }
 
    setIsScanning(true);
  };
 
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
 
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };
 
  const appendQueryParams = (url: string, params: Record<string, string>) => {
    const urlObj = new URL(url);
    Object.keys(params).forEach((key) => {
      urlObj.searchParams.append(key, params[key]);
    });
    return urlObj.toString();
  };
 
  const closePrefilledForm = () => {
    setFormUrl(null);
    setScannedData(null);
    setError(null);
    setScannerStopped(false);
  };
 
  useEffect(() => {
    if (scannedData) {
      stopScanning();
    }
  }, [scannedData, stopScanning]);
 
  useEffect(() => {
    return () => stopScanning();
  }, [stopScanning]);
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">QR Code Scanner</h1>
      {!scannerStopped && !scannedData && (
        <div className="relative w-full max-w-md mb-4">
          <video key={isScanning ? 'scanning' : 'stopped'} ref={videoRef} style={{ width: '100%', height: 'auto' }} />
          {isScanning && (
            <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
              <span className="text-white text-xl">Scanning...</span>
            </div>
          )}
        </div>
      )}
      {!isScanning && !scannedData && (
        <button onClick={startScanning} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Start Scanning
        </button>
      )}
      {isScanning && !scannedData && (
        <button onClick={stopScanning} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
          Stop Scanning
        </button>
      )}
      {formUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-4/5 lg:w-3/5 max-h-[90vh] overflow-hidden relative">
            <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>
            <div className="w-full h-full overflow-auto border border-gray-200 rounded-lg">
              <iframe
                src={formUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                title="Prefilled Form"
                onError={() => setError('Failed to load the content.')}
              >
                Your browser does not support iframes.
              </iframe>
            </div>
            <button
              className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900"
              onClick={closePrefilledForm}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>
      )}
    </div>
  );
}
 
 
