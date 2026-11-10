import cv2
import os

video_path = r"C:\Users\Kartik Shukla\Videos\Screen Recordings\Screen Recording 2026-11-10 085933.mp4"
output_dir = r"D:\Portfolio\scripts\frames"

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS) or 30
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps
print(f"Video FPS: {fps}, Total Frames: {total_frames}, Duration: {duration:.2f}s")

# Extract 1 frame every 3 seconds
interval_frames = int(fps * 3)
saved_count = 0

for f in range(0, total_frames, interval_frames):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f)
    ret, frame = cap.read()
    if ret:
        sec = int(f / fps)
        out_name = f"frame_{sec:03d}s.jpg"
        out_path = os.path.join(output_dir, out_name)
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
        saved_count += 1

cap.release()
print(f"Successfully extracted {saved_count} frames into {output_dir}")

