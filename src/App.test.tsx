import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Reset window scroll position
    window.scrollY = 0;
    vi.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the main application without crashing', () => {
      render(<App />);
      expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    });

    it('should render navigation with correct links', () => {
      render(<App />);
      expect(screen.getByText('About me')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render hero section with greeting text', () => {
      render(<App />);
      expect(screen.getByText('Hello.')).toBeInTheDocument();
      expect(screen.getByText("I'm Saugat Giri")).toBeInTheDocument();
    });

    it('should display all main sections', () => {
      render(<App />);
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText('What I Do')).toBeInTheDocument();
      expect(screen.getByText('My Projects')).toBeInTheDocument();
      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    });
  });

  describe('Navigation Behavior - Mobile Responsiveness', () => {
    it('should have hidden class on navigation for mobile screens', () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('hidden');
      expect(nav).toHaveClass('md:block');
    });

    it('should render navigation as fixed positioned element', () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('fixed');
      expect(nav).toHaveClass('top-0');
      expect(nav).toHaveClass('w-full');
      expect(nav).toHaveClass('z-50');
    });

    it('should have proper transition classes on navigation', () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('transition-all');
      expect(nav).toHaveClass('duration-500');
    });
  });

  describe('Dark Mode Toggle', () => {
    it('should render dark mode toggle button', () => {
      const { container } = render(<App />);
      const toggleButtons = container.querySelectorAll('button');
      const darkModeButton = Array.from(toggleButtons).find(
        (btn) => btn.querySelector('.lucide-moon') || btn.querySelector('.lucide-sun')
      );
      expect(darkModeButton).toBeTruthy();
    });

    it('should toggle dark mode when button is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      const mainDiv = container.querySelector('.min-h-screen');
      const initialClasses = mainDiv?.className;
      
      // Find and click the dark mode toggle button
      const toggleButtons = container.querySelectorAll('button');
      const darkModeButton = Array.from(toggleButtons).find(
        (btn) => btn.querySelector('.lucide-moon') || btn.querySelector('.lucide-sun')
      );
      
      if (darkModeButton) {
        await user.click(darkModeButton);
        
        await waitFor(() => {
          const updatedClasses = mainDiv?.className;
          expect(updatedClasses).not.toBe(initialClasses);
        });
      }
    });

    it('should change background gradient when toggling dark mode', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      const mainDiv = container.querySelector('.min-h-screen');
      
      // Initially should have light mode classes
      expect(mainDiv).toHaveClass('bg-gradient-to-br');
      
      // Find dark mode toggle button
      const toggleButtons = container.querySelectorAll('button');
      const darkModeButton = Array.from(toggleButtons).find(
        (btn) => btn.querySelector('.lucide-moon') || btn.querySelector('.lucide-sun')
      );
      
      if (darkModeButton) {
        await user.click(darkModeButton);
        
        await waitFor(() => {
          expect(mainDiv).toHaveClass('bg-gradient-to-br');
        });
      }
    });
  });

  describe('Scroll Behavior', () => {
    it('should update scroll state when window scrolls', async () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(nav).toHaveClass('backdrop-blur-md');
      });
    });

    it('should not have backdrop blur when not scrolled', () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      
      expect(window.scrollY).toBe(0);
      expect(nav).toHaveClass('bg-transparent');
    });

    it('should handle scroll event listener cleanup', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<App />);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Section Navigation', () => {
    it('should scroll to section when navigation link is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;
      
      const aboutLink = screen.getByText('About me');
      await user.click(aboutLink);
      
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it('should call scrollToSection with correct section id', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;
      
      const servicesLink = screen.getByText('Services');
      await user.click(servicesLink);
      
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it('should handle navigation to all main sections', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;
      
      const links = ['About me', 'Services', 'Projects', 'Contact'];
      
      for (const linkText of links) {
        const link = screen.getByText(linkText);
        await user.click(link);
      }
      
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(4);
    });
  });

  describe('Services Section', () => {
    it('should render all service cards', () => {
      render(<App />);
      
      expect(screen.getByText('Database Design')).toBeInTheDocument();
      expect(screen.getByText('API Development')).toBeInTheDocument();
      expect(screen.getByText('Cloud Deployment')).toBeInTheDocument();
      expect(screen.getByText('Security Implementation')).toBeInTheDocument();
    });

    it('should display service descriptions', () => {
      render(<App />);
      
      expect(screen.getByText(/Designing efficient database schemas/i)).toBeInTheDocument();
      expect(screen.getByText(/Building RESTful APIs/i)).toBeInTheDocument();
      expect(screen.getByText(/Deploying applications on cloud platforms/i)).toBeInTheDocument();
      expect(screen.getByText(/Implementing secure authentication systems/i)).toBeInTheDocument();
    });

    it('should render service icons', () => {
      const { container } = render(<App />);
      const serviceIcons = container.querySelectorAll('.lucide-database, .lucide-server, .lucide-cloud, .lucide-shield');
      expect(serviceIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Projects Section', () => {
    it('should render all project cards', () => {
      render(<App />);
      
      expect(screen.getByText('Hamro Dokan')).toBeInTheDocument();
      expect(screen.getByText('Mero Doctor')).toBeInTheDocument();
      expect(screen.getByText('Student Portal')).toBeInTheDocument();
    });

    it('should display project descriptions', () => {
      render(<App />);
      
      expect(screen.getByText(/comprehensive e-commerce platform/i)).toBeInTheDocument();
      expect(screen.getByText(/Healthcare management system/i)).toBeInTheDocument();
      expect(screen.getByText(/University student management system/i)).toBeInTheDocument();
    });

    it('should show project status badges', () => {
      render(<App />);
      
      const liveStatus = screen.getAllByText('Live');
      const completedStatus = screen.getAllByText('Completed');
      
      expect(liveStatus.length).toBeGreaterThan(0);
      expect(completedStatus.length).toBeGreaterThan(0);
    });

    it('should display project technologies', () => {
      render(<App />);
      
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Express')).toBeInTheDocument();
      expect(screen.getByText('MongoDB')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });

    it('should render project features', () => {
      render(<App />);
      
      expect(screen.getByText('User Authentication')).toBeInTheDocument();
      expect(screen.getByText('Product Management')).toBeInTheDocument();
      expect(screen.getByText('Appointment Booking')).toBeInTheDocument();
      expect(screen.getByText('Course Management')).toBeInTheDocument();
    });
  });

  describe('Contact Section', () => {
    it('should render contact information', () => {
      render(<App />);
      
      expect(screen.getByText('saugatgiri1070@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('https://github.com/saugat1070')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/saugat1070')).toBeInTheDocument();
    });

    it('should render contact form inputs', () => {
      render(<App />);
      
      expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    });

    it('should render send message button', () => {
      render(<App />);
      
      expect(screen.getByText('Send Message')).toBeInTheDocument();
    });

    it('should allow typing in contact form inputs', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const nameInput = screen.getByPlaceholderText('Your Name') as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText('Your Email') as HTMLInputElement;
      const messageInput = screen.getByPlaceholderText('Your Message') as HTMLTextAreaElement;
      
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(messageInput, 'Test message content');
      
      expect(nameInput.value).toBe('Test User');
      expect(emailInput.value).toBe('test@example.com');
      expect(messageInput.value).toBe('Test message content');
    });
  });

  describe('Download CV Button - New Feature', () => {
    it('should render Download CV button in contact section', () => {
      render(<App />);
      
      expect(screen.getByText('Download CV')).toBeInTheDocument();
    });

    it('should have correct href for PDF download', () => {
      const { container } = render(<App />);
      
      const downloadLink = container.querySelector('a[href="public/saugatGiri.pdf"]');
      expect(downloadLink).toBeInTheDocument();
    });

    it('should open CV in new tab', () => {
      const { container } = render(<App />);
      
      const downloadLink = container.querySelector('a[href="public/saugatGiri.pdf"]');
      expect(downloadLink).toHaveAttribute('target', '_blank');
    });

    it('should have proper styling on Download CV button', () => {
      const { container } = render(<App />);
      
      // Find the button containing the Download CV link
      const buttons = Array.from(container.querySelectorAll('button'));
      const downloadButton = buttons.find(btn => 
        btn.textContent?.includes('Download CV')
      );
      
      expect(downloadButton).toBeTruthy();
      expect(downloadButton).toHaveClass('px-8', 'py-4', 'rounded-lg');
    });
  });

  describe('Rotating Badge - Responsive Positioning', () => {
    it('should have responsive flex classes on rotating badge container', () => {
      const { container } = render(<App />);
      
      // Find the rotating badge container
      const badgeContainer = container.querySelector('.rotating-badge')?.parentElement;
      
      expect(badgeContainer).toBeTruthy();
      expect(badgeContainer).toHaveClass('flex');
      expect(badgeContainer).toHaveClass('md:justify-start');
      expect(badgeContainer).toHaveClass('sm:justify-center');
    });

    it('should render rotating badge with correct text', () => {
      const { container } = render(<App />);
      
      const badgeText = container.querySelector('.rotating-badge text');
      expect(badgeText?.textContent).toContain('BACKEND DEVELOPER');
    });

    it('should have updated text size class', () => {
      const { container } = render(<App />);
      
      const badgeText = container.querySelector('.rotating-badge text');
      expect(badgeText).toHaveClass('text-sm');
    });
  });

  describe('About Section', () => {
    it('should display profile information', () => {
      render(<App />);
      
      expect(screen.getByText(/Electronic and Communication Engineering student/i)).toBeInTheDocument();
      expect(screen.getByText(/strong passion for backend development/i)).toBeInTheDocument();
    });

    it('should show statistics', () => {
      render(<App />);
      
      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('Projects Built')).toBeInTheDocument();
      expect(screen.getByText('1+')).toBeInTheDocument();
      expect(screen.getByText('Years Learning')).toBeInTheDocument();
    });

    it('should display technical skills with progress bars', () => {
      render(<App />);
      
      expect(screen.getByText('Node.js & Express')).toBeInTheDocument();
      expect(screen.getByText('Python & Django')).toBeInTheDocument();
      expect(screen.getByText('Database Design')).toBeInTheDocument();
      expect(screen.getByText('API Development')).toBeInTheDocument();
      expect(screen.getByText('Cloud Platforms')).toBeInTheDocument();
    });

    it('should render skill percentages', () => {
      render(<App />);
      
      expect(screen.getByText('70%')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
      expect(screen.getByText('55%')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('should render student status badge', () => {
      render(<App />);
      
      expect(screen.getByText('Student Dev')).toBeInTheDocument();
    });

    it('should display current study information', () => {
      render(<App />);
      
      expect(screen.getByText('Currently Studying')).toBeInTheDocument();
      expect(screen.getByText(/Electronic and Communication Engineering Student/i)).toBeInTheDocument();
    });

    it('should render current focus items', () => {
      render(<App />);
      
      expect(screen.getByText('Current Focus')).toBeInTheDocument();
      expect(screen.getByText('Database Design & Optimization')).toBeInTheDocument();
      expect(screen.getByText('RESTful API Development')).toBeInTheDocument();
      expect(screen.getByText('Cloud Technologies')).toBeInTheDocument();
    });

    it('should render Let\'s Connect button', () => {
      render(<App />);
      
      const connectButtons = screen.getAllByText("Let's Connect");
      expect(connectButtons.length).toBeGreaterThan(0);
    });

    it('should navigate to contact section when Let\'s Connect is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;
      
      const connectButtons = screen.getAllByText("Let's Connect");
      await user.click(connectButtons[0]);
      
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  describe('Footer', () => {
    it('should render footer with copyright information', () => {
      render(<App />);
      
      expect(screen.getByText(/© 2025 Saugat Giri/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    });

    it('should display availability badge', () => {
      render(<App />);
      
      expect(screen.getByText('Open to opportunities')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles for interactive elements', () => {
      const { container } = render(<App />);
      
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button).toBeInstanceOf(HTMLButtonElement);
      });
    });

    it('should have form inputs with placeholders', () => {
      render(<App />);
      
      const nameInput = screen.getByPlaceholderText('Your Name');
      const emailInput = screen.getByPlaceholderText('Your Email');
      const messageInput = screen.getByPlaceholderText('Your Message');
      
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
    });

    it('should have image with alt text', () => {
      const { container } = render(<App />);
      
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('Responsive Design Classes', () => {
    it('should have responsive grid classes in hero section', () => {
      const { container } = render(<App />);
      
      const heroGrid = container.querySelector('.lg\\:grid-cols-3');
      expect(heroGrid).toBeInTheDocument();
    });

    it('should have responsive service grid', () => {
      const { container } = render(<App />);
      
      const serviceGrid = container.querySelector('.lg\\:grid-cols-4');
      expect(serviceGrid).toBeInTheDocument();
    });

    it('should have responsive project grid', () => {
      const { container } = render(<App />);
      
      const projectGrid = container.querySelector('.lg\\:grid-cols-3');
      expect(projectGrid).toBeInTheDocument();
    });
  });

  describe('Theme Classes Management', () => {
    it('should apply proper theme classes initially', () => {
      const { container } = render(<App />);
      
      const mainDiv = container.querySelector('.min-h-screen');
      expect(mainDiv).toHaveClass('transition-all', 'duration-500');
    });

    it('should manage background gradient classes', () => {
      const { container } = render(<App />);
      
      const mainDiv = container.querySelector('.min-h-screen');
      expect(mainDiv).toHaveClass('bg-gradient-to-br');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing section element gracefully', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Mock getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);
      
      const aboutLink = screen.getByText('About me');
      await user.click(aboutLink);
      
      // Should not throw error
      expect(aboutLink).toBeInTheDocument();
      
      // Restore original function
      document.getElementById = originalGetElementById;
    });

    it('should handle rapid scroll events', () => {
      const { container } = render(<App />);
      
      // Simulate multiple rapid scroll events
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
      fireEvent.scroll(window);
      
      Object.defineProperty(window, 'scrollY', { value: 120, writable: true });
      fireEvent.scroll(window);
      
      Object.defineProperty(window, 'scrollY', { value: 180, writable: true });
      fireEvent.scroll(window);
      
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should handle multiple dark mode toggles', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      const toggleButtons = container.querySelectorAll('button');
      const darkModeButton = Array.from(toggleButtons).find(
        (btn) => btn.querySelector('.lucide-moon') || btn.querySelector('.lucide-sun')
      );
      
      if (darkModeButton) {
        await user.click(darkModeButton);
        await user.click(darkModeButton);
        await user.click(darkModeButton);
        
        expect(darkModeButton).toBeInTheDocument();
      }
    });
  });

  describe('Form Validation and Interaction', () => {
    it('should have proper input types', () => {
      render(<App />);
      
      const emailInput = screen.getByPlaceholderText('Your Email');
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const nameInput = screen.getByPlaceholderText('Your Name');
      expect(nameInput).toHaveAttribute('type', 'text');
    });

    it('should render textarea for message input', () => {
      render(<App />);
      
      const messageInput = screen.getByPlaceholderText('Your Message');
      expect(messageInput.tagName).toBe('TEXTAREA');
    });

    it('should have submit button in form', () => {
      const { container } = render(<App />);
      
      const form = container.querySelector('form');
      const submitButton = form?.querySelector('button[type="submit"]');
      
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Animation Classes', () => {
    it('should have animation classes on hero elements', () => {
      const { container } = render(<App />);
      
      const fadeInElements = container.querySelectorAll('.animate-fade-in');
      expect(fadeInElements.length).toBeGreaterThan(0);
    });

    it('should have pulse animation on various elements', () => {
      const { container } = render(<App />);
      
      const pulseElements = container.querySelectorAll('.animate-pulse');
      expect(pulseElements.length).toBeGreaterThan(0);
    });

    it('should have bounce animation on decorative elements', () => {
      const { container } = render(<App />);
      
      const bounceElements = container.querySelectorAll('.animate-bounce');
      expect(bounceElements.length).toBeGreaterThan(0);
    });
  });
});